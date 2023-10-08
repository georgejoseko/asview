import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'hierarchy-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss'],
})
export class ImportFormComponent implements OnInit {
  dataObject!: any;
  dataString!: any;
  type!: 'requirement' | 'design';
  imports!: string[];
  hierarchyId!: number;
  selectedItemIndex!: number;
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public editData: {
      hierarchyId: number;
      type: 'requirement' | 'design';
      newId: number;
    },
    private dialogRef: MatDialogRef<ImportFormComponent>
  ) {}

  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.hierarchyId = this.editData?.hierarchyId;
    this.type = this.editData.type;
    if (this.type === 'requirement') {
      this.imports = [];
      this.dataObject.stk.forEach((stk: any) => {
        stk?.system?.forEach((sys: any) => {
          this.imports.push(sys?.taskdesc);
        });
      });
    } else if (this.type === 'design') {
      this.imports = [];
      this.dataObject.stk?.forEach((stk: any) => {
        stk?.system?.forEach((sys: any) => {
          sys?.software?.forEach((sw: any) => {
            this.imports.push(sw?.taskdesc);
          });
        });
      });
    }
  }

  addImport() {
    if (!this.dataObject.architecture[this.hierarchyId][this.type])
      this.dataObject.architecture[this.hierarchyId][this.type] = {};
    this.dataObject.architecture[this.hierarchyId][this.type][
      this.editData.newId
    ] = {
      id: this.editData.newId,
      data: this.imports[this.selectedItemIndex],
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
