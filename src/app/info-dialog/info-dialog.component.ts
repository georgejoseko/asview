import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoComponent {
  title: string = 'Info!';
  description: string = 'This action is not available.';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public _date: { title: string; description: string },
    private dialogRef: MatDialogRef<InfoComponent>
  ) {}

  ngOnInit(): void {
    if (!!this._date) {
      this.title = this._date.title;
      this.description = this._date.description;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
