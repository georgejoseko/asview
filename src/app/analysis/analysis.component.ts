import { Component, OnInit } from '@angular/core';
import { ConfirmationComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Analysis } from './types';
import { AnalysisFormComponent } from './form/analysis-form.component';
import { TableColumn } from '../types';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  analysis!: { [id: number]: Analysis };
  dataSource = new MatTableDataSource<Analysis>([]);
  tableColumns: TableColumn[] = [
    {
      name: 'id',
      title: 'ID',
    },
    {
      name: 'description',
      title: 'Description',
    },
    {
      name: 'status',
      title: 'Status',
    },
    {
      name: 'comment',
      title: 'Comment',
    },
    {
      name: 'referance',
      title: 'Referance',
    },
  ];
  displayedColumns: string[];
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AnalysisComponent>
  ) {
    this.displayedColumns = this.tableColumns.map((tableColumn) => {
      return tableColumn.name;
    });
  }

  ngOnInit(): void {
    const dataString = localStorage.getItem('DATA') ?? '{}';
    const dataObject = JSON.parse(dataString);
    this.analysis = dataObject['analysis'] ?? {
      0: {
        id: '-',
        description: 'No analysis avalable!',
        status: '-',
        comment: '-',
        referance: '-',
      },
    };
    this.dataSource.data = Object.values(this.analysis);
  }

  addAnalysis() {
    this.dialog
      .open(AnalysisFormComponent, {
        disableClose: true,
        data: {
          newId: Math.max(...Object.keys(this.analysis).map(Number)) + 1,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }

  onRowClick(row: Analysis): void {
    this.dialog
      .open(AnalysisFormComponent, {
        disableClose: true,
        data: { analysis: row },
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }

  close(): void {
    this.dialog
      .open(ConfirmationComponent, {
        disableClose: true,
        data: {
          title: 'Confirm Close!',
          description: `Confirm close analysis dialog?`,
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (!!resp) this.dialogRef.close();
      });
  }

  sortData(sort: Sort) {
    const data = Object.values(this.analysis);
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'comment':
          return this.compare(a.comment, b.comment, isAsc);
        case 'referance':
          return this.compare(a.referance, b.referance, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
