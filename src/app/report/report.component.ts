import { Component, OnInit } from '@angular/core';
import { ConfirmationComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  report: string = '';
  dataString!: string;
  dataObject!: any;
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ReportComponent>
  ) {}

  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA') ?? '';
    this.dataObject = JSON.parse(this.dataString);
    this.report = this.dataObject.report ?? '';
  }

  onUpdate(): void {
    this.dataObject["report"] = this.report;
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
  }

  close(): void {
    this.dialog
      .open(ConfirmationComponent, {
        disableClose: true,
        data: {
          title: 'Confirm Close!',
          description: `Confirm close dialog without saving?`,
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (!!resp) this.dialogRef.close();
      });
  }
}
