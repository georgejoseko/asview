import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskidService } from '../taskid.service';
import { ConfirmationComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-addsystem',
  templateUrl: './addsystem.component.html',
  styleUrls: ['./addsystem.component.scss'],
})
export class AddsystemComponent implements OnInit {
  systemForm!: FormGroup;
  dataObject!: any;
  dataString!: any;
  arrindxstk!: number;
  constructor(
    private dialog: MatDialog,
    private service: TaskidService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddsystemComponent>
  ) {}

  ngOnInit(): void {
    this.systemForm = this.formBuilder.group({
      taskdesc: ['', Validators.required],
      risk: [''],
      url: [''],
      comp: [''],
      stkmail: [''],
    });
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.systemForm.controls['taskdesc'].setValue(
      this.dataObject.stk[this.editData.istk].system[this.editData.isys]
        .taskdesc
    );
    this.systemForm.controls['risk'].setValue(
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].risk
    );
    this.systemForm.controls['url'].setValue(
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].url
    );
    this.systemForm.controls['comp'].setValue(
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].comp
    );
    this.systemForm.controls['stkmail'].setValue(
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].stkmail
    );
  }
  addSys() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.arrindxstk = this.service.stkid;
    if (
      this.dataObject.stk[this.arrindxstk].hasOwnProperty('system') == false
    ) {
      this.dataObject.stk[this.arrindxstk]['system'] = [];
    }
    if (this.editData == null) {
      this.dataObject.stk[this.arrindxstk]['system'].push(
        this.systemForm.value
      );
    } else {
      this.dataObject.stk[this.editData.istk].system[
        this.editData.isys
      ].taskdesc = this.systemForm.value.taskdesc;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].risk =
        this.systemForm.value.risk;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].url =
        this.systemForm.value.url;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].comp =
        this.systemForm.value.comp;
      this.dataObject.stk[this.editData.istk].system[
        this.editData.isys
      ].stkmail = this.systemForm.value.stkmail;
    }
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
