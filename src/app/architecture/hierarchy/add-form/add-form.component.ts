import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { HierarchyItem } from '../types';

@Component({
  selector: 'hierarchy-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  dataObject!: any;
  dataString!: any;
  type!: 'requirement' | 'design';
  addData: string = '';
  hierarchyId!: number;
  addId!: number;
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public editData: {
      hierarchyId: number;
      type: 'requirement' | 'design';
      newId?: number;
      item?: HierarchyItem;
    },
    private dialogRef: MatDialogRef<AddFormComponent>
  ) {}

  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.hierarchyId = this.editData?.hierarchyId;
    this.addId = this.editData?.newId ?? this.editData?.item?.id!;
    this.addData = this.editData?.item?.data ?? '';
    this.type = this.editData.type;
  }

  onSubmit() {
    if (!this.dataObject.architecture[this.hierarchyId][this.type])
      this.dataObject.architecture[this.hierarchyId][this.type] = {};
    this.dataObject.architecture[this.hierarchyId][this.type][this.addId] = {
      id: this.addId,
      data: this.addData,
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
