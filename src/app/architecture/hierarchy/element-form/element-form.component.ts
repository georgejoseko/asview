import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HierarchyElement } from '../types';
import { ConfirmationComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'hierarchy-element-form',
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.scss'],
})
export class ElementFormComponent implements OnInit {
  elementForm!: FormGroup;
  dataObject!: any;
  dataString!: any;
  elementId!: number;
  hierarchyId!: number;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public editData: { element: HierarchyElement; newId: number; hierarchyId: number },
    private dialogRef: MatDialogRef<ElementFormComponent>
  ) {}

  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      value: [''],
    });
    if (!!this.editData) {
      if (!!this.editData.newId) {
        this.elementId = this.editData.newId;
      } else {
        this.elementId = this.editData.element.id;
        this.elementForm.patchValue(this.editData.element);
      }
      this.hierarchyId = this.editData.hierarchyId;
    }
  }

  addElement() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    if (!this.dataObject.architecture[this.hierarchyId].element)
      this.dataObject.architecture[this.hierarchyId].element = {};
      this.dataObject.architecture[this.hierarchyId].element[this.elementId] = {
      ...this.elementForm.value,
      id: this.elementId,
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
