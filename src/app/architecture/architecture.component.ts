import { Component, OnInit } from '@angular/core';
import { ConfirmationComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Architecture } from './types';
import { ArchitectureFormComponent } from './form/architecture-form.component';
import { TableColumn } from '../types';
import { lastValueFrom, retry } from 'rxjs';
import { HierarchyComponent } from './hierarchy/hierarchy.component';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
})
export class ArchitectureComponent implements OnInit {
  architecture!: { [id: number]: Architecture };
  dataSource = new MatTableDataSource<Architecture>([]);
  tableColumns: TableColumn[];
  displayedColumns: string[];
  dataString!: string;
  dataObject: any;
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ArchitectureComponent>
  ) {
    this.tableColumns = [
      { name: 'id', title: 'ID' },
      { name: 'mainHierarchy', title: 'Main Hierarchy' },
      { name: 'subHierarchy', title: 'Sub Hierarchy' },
      { name: 'level', title: 'Level' },
      { name: 'comment', title: 'Comment' },
      { name: 'action', title: '' },
    ];
    this.displayedColumns = this.tableColumns.map((tableColumn) => {
      return tableColumn.name;
    });
  }

  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA') ?? '{}';
    this.dataObject = JSON.parse(this.dataString);
    this.architecture = this.dataObject['architecture'] ?? {
      0: {
        id: '-',
        mainHierarchy: 'No architecture avalable!',
        subHierarchy: '-',
        level: '-',
        comment: '-',
      },
    };
    this.dataSource.data = Object.values(this.architecture);
  }

  addArchitecture() {
    this.dialog
      .open(ArchitectureFormComponent, {
        disableClose: true,
        data: {
          newId: Math.max(...Object.keys(this.architecture).map(Number)) + 1,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onRowClick(row: Architecture): void {
    this.dialog
      .open(ArchitectureFormComponent, {
        disableClose: true,
        data: { architecture: row },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  editArchitecture(row: Architecture): void {
    this.dialog.open(HierarchyComponent, {
      disableClose: true,
      width: '50vw',
      minWidth: '720px',
      height: '50vh',
      minHeight: '480px',
      data: { architecture: row },
    });
  }

  async deleteArchitecture(row: Architecture): Promise<void> {
    if (
      !(await this.getConfirmation(
        'Confirm Delete?',
        'Confirm deleting the hierarchy?'
      ))
    )
      return;
    if (Object.keys(this.dataObject['architecture']).length === 1)
      delete this.dataObject['architecture'];
    else delete this.dataObject['architecture'][row.id];
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
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

  async close(): Promise<void> {
    if (
      await this.getConfirmation(
        'Confirm Close!',
        'Confirm close architecture dialog?'
      )
    )
      this.dialogRef.close();
  }
}
