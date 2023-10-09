import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Architecture } from '../types';
import { ConfirmationComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/types';
import { ElementFormComponent } from './element-form/element-form.component';
import { ImportFormComponent } from './import-form/import-form.component';
import { HierarchyElement, HierarchyItem } from './types';
import { lastValueFrom } from 'rxjs';
import { AddFormComponent } from './add-form/add-form.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
})
export class HierarchyComponent implements OnInit {
  dataObject!: any;
  dataString!: any;
  hierarchyId!: number;
  mainHierarchy!: string;
  subHierarchy!: string;
  elements!: { [id: number]: HierarchyElement };
  elementDataSource = new MatTableDataSource<HierarchyElement>([]);
  elementTableColumns: TableColumn[];
  elementDisplayedColumns: string[];
  requirements!: { [id: number]: HierarchyItem };
  requirementDataSource = new MatTableDataSource<HierarchyItem>([]);
  requirementTableColumns: TableColumn[];
  requirementDisplayedColumns: string[];
  designs!: { [id: number]: HierarchyItem };
  designDataSource = new MatTableDataSource<HierarchyItem>([]);
  designTableColumns: TableColumn[];
  designDisplayedColumns: string[];
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public editData: { architecture: Architecture; newId: number },
    private dialogRef: MatDialogRef<HierarchyComponent>
  ) {
    this.elementTableColumns = [
      { name: 'type', title: 'Type' },
      { name: 'name', title: 'Name' },
      { name: 'description', title: 'Description' },
      { name: 'value', title: 'Value' },
      { name: 'action', title: '' },
    ];
    this.elementDisplayedColumns = this.elementTableColumns.map(
      (tableColumn) => {
        return tableColumn.name;
      }
    );
    this.requirementTableColumns = [
      { name: 'id', title: 'ID' },
      { name: 'data', title: 'Description' },
      { name: 'action', title: '' },
    ];
    this.requirementDisplayedColumns = this.requirementTableColumns.map(
      (tableColumn) => {
        return tableColumn.name;
      }
    );
    this.designTableColumns = [
      { name: 'id', title: 'ID' },
      { name: 'data', title: 'Requirement' },
      { name: 'action', title: '' },
    ];
    this.designDisplayedColumns = this.designTableColumns.map((tableColumn) => {
      return tableColumn.name;
    });
  }

  ngOnInit(): void {
    if (!!this.editData) {
      this.dataString = localStorage.getItem('DATA') ?? '{}';
      this.dataObject = JSON.parse(this.dataString);
      this.hierarchyId = this.editData.architecture.id;
      this.mainHierarchy = this.editData.architecture.mainHierarchy;
      this.subHierarchy = this.editData.architecture.subHierarchy;
      this.elements = this.dataObject['architecture'][this.hierarchyId][
        'element'
      ] ?? {
        0: {
          type: '-',
          name: 'No element avalable!',
          description: '-',
          value: '-',
        },
      };
      this.elementDataSource.data = Object.values(this.elements);
      this.requirements = this.dataObject['architecture'][this.hierarchyId][
        'requirement'
      ] ?? { 0: { id: '-', data: 'No requirement avalable!' } };
      this.requirementDataSource.data = Object.values(this.requirements);
    }
    this.designs = this.dataObject['architecture'][this.hierarchyId][
      'design'
    ] ?? { 0: { id: '-', data: 'No design avalable!' } };
    this.designDataSource.data = Object.values(this.designs);
  }

  addElement() {
    this.dialog
      .open(ElementFormComponent, {
        disableClose: true,
        data: {
          hierarchyId: this.hierarchyId,
          newId: Math.max(...Object.keys(this.elements).map(Number)) + 1,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onEditElement(element: Element): void {
    this.dialog
      .open(ElementFormComponent, {
        disableClose: true,
        data: { hierarchyId: this.hierarchyId, element },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onImportItem(type: 'requirement' | 'design'): void {
    this.dialog
      .open(ImportFormComponent, {
        disableClose: true,
        data: {
          hierarchyId: this.hierarchyId,
          newId:
            Math.max(
              ...Object.keys(
                type === 'requirement' ? this.requirements : this.designs
              ).map(Number)
            ) + 1,
          type,
        },
        width: '40vw',
        minWidth: '660px',
        height: '40vh',
        minHeight: '440px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onAddItem(type: 'requirement' | 'design'): void {
    this.dialog
      .open(AddFormComponent, {
        disableClose: true,
        data: {
          hierarchyId: this.hierarchyId,
          newId:
            Math.max(
              ...Object.keys(
                type === 'requirement' ? this.requirements : this.designs
              ).map(Number)
            ) + 1,
          type,
        },
        width: '40vw',
        minWidth: '660px',
        height: '40vh',
        minHeight: '440px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onEditItem(item: HierarchyItem, type: 'requirement' | 'design'): void {
    this.dialog
      .open(AddFormComponent, {
        disableClose: true,
        data: {
          hierarchyId: this.hierarchyId,
          item,
          type,
        },
        width: '40vw',
        minWidth: '660px',
        height: '40vh',
        minHeight: '440px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  async onDeleteItem(
    item: HierarchyItem | Element,
    type: 'requirement' | 'design' | 'element'
  ): Promise<void> {
    if (
      !(await this.getConfirmation(
        'Confirm Delete?',
        'Confirm deleting the item?'
      ))
    )
      return;
    if (
      Object.keys(this.dataObject.architecture[this.hierarchyId][type])
        .length === 1
    )
      delete this.dataObject.architecture[this.hierarchyId][type];
    else delete this.dataObject.architecture[this.hierarchyId][type][item.id];
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }

  async close(): Promise<void> {
    if (
      await this.getConfirmation(
        'Confirm Close!',
        'Confirm close hierarchy dialog?'
      )
    )
      this.dialogRef.close();
  }

  getConfirmation(title: string, description: string): Promise<boolean> {
    return lastValueFrom(
      this.dialog
        .open(ConfirmationComponent, {
          disableClose: true,
          data: { title, description },
        })
        .afterClosed()
    );
  }

  sortElementData(sort: Sort) {
    const data = Object.values(this.elements);
    if (!sort.active || sort.direction === '') {
      this.elementDataSource.data = data;
      return;
    }

    this.elementDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        case 'value':
          return this.compare(a.value, b.value, isAsc);
        default:
          return 0;
      }
    });
  }

  sortRequirementData(sort: Sort) {
    const data = Object.values(this.requirements);
    if (!sort.active || sort.direction === '') {
      this.requirementDataSource.data = data;
      return;
    }

    this.requirementDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'data':
          return this.compare(a.data, b.data, isAsc);
        default:
          return 0;
      }
    });
  }

  sortDesignData(sort: Sort) {
    const data = Object.values(this.designs);
    if (!sort.active || sort.direction === '') {
      this.designDataSource.data = data;
      return;
    }

    this.designDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'data':
          return this.compare(a.data, b.data, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
