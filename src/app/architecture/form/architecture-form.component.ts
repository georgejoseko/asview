import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Architecture } from '../types';
import { ConfirmationComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-architecture-form',
  templateUrl: './architecture-form.component.html',
  styleUrls: ['./architecture-form.component.scss'],
})
export class ArchitectureFormComponent implements OnInit {
  architectureForm!: FormGroup;
  dataObject!: any;
  dataString!: any;
  architectureId!: number;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public editData: { architecture: Architecture; newId: number },
    private dialogRef: MatDialogRef<ArchitectureFormComponent>
  ) {}

  ngOnInit(): void {
    this.architectureForm = this.formBuilder.group({
      mainHierarchy: ['', Validators.required],
      subHierarchy: [''],
      level: [''],
      comment: [''],
    });
    if (!!this.editData) {
      if (!!this.editData.newId) {
        this.architectureId = this.editData.newId;
      } else {
        this.architectureId = this.editData.architecture.id;
        this.architectureForm.patchValue(this.editData.architecture);
      }
    }
  }
  addArchitecture() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    if (!this.dataObject['architecture']) this.dataObject['architecture'] = {};
    this.dataObject.architecture[this.architectureId] = {
      ...this.architectureForm.value,
      id: this.architectureId,
    };
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
