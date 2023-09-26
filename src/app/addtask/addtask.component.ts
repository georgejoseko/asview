import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
})
export class AddtaskComponent implements OnInit {
  taskForm!: FormGroup;
  dataObject!: any;
  dataString!: any;
  isEdit: boolean = false;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddtaskComponent>
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskid: ['', Validators.required],
      title: ['', Validators.required],
    });
    if (!!this.data) {
      this.isEdit = this.data.isEdit;
      this.dataString = localStorage.getItem('DATA');
      this.dataObject = JSON.parse(this.dataString);
      this.taskForm.patchValue({
        taskid: this.dataObject["id"],
        title: this.dataObject["title"]
      })
    }
  }

  addTask() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.dataObject = {};
    this.dataObject['id'] = this.taskForm.value.taskid;
    this.dataObject['title'] = this.taskForm.value.title;
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }

  editTask() {
    this.dataObject['id'] = this.taskForm.value.taskid;
    this.dataObject['title'] = this.taskForm.value.title;
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
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
