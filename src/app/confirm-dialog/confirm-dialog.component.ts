import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmationComponent {
  title: string = 'Confirmation dialog!';
  description: string = 'Please submit your confirmation for the actions.';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public _date: {
      title: string;
      description: string;
    },
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) {}

  ngOnInit(): void {
    if (!!this._date) {
      this.title = this._date.title;
      this.description = this._date.description;
    }
  }

  emitOption(action: boolean): void {
    this.dialogRef.close(action);
  }
}
