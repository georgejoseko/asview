import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-addstake',
  templateUrl: './addstake.component.html',
  styleUrls: ['./addstake.component.scss'],
})
export class AddstakeComponent implements OnInit {
  stakeForm!: FormGroup;
  dataObject!: any;
  dataString!: any;
  requirements: FormControl<string | null>[] = [];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddstakeComponent>
    ) {}

  ngOnInit(): void {
    this.stakeForm = this.formBuilder.group({
      taskdesc: ['', Validators.required],
      // eldesc: [''],
      stkmail: [''],
      targetrel: [''],
      // opl: [''],
      state: [''],
    });
    if (!!this.editData || this.editData === 0) {
      this.dataString = localStorage.getItem('DATA');
      this.dataObject = JSON.parse(this.dataString);
      this.stakeForm.controls['taskdesc'].setValue(
        this.dataObject.stk[this.editData].taskdesc
      );
      this.requirements = this.dataObject.stk[this.editData].requirements.map(
        (requirement: string) => {
          return new FormControl(requirement);
        }
      );
      this.stakeForm.controls['stkmail'].setValue(
        this.dataObject.stk[this.editData].stkmail
      );
      this.stakeForm.controls['targetrel'].setValue(
        this.dataObject.stk[this.editData].targetrel
      );
      this.stakeForm.controls['state'].setValue(
        this.dataObject.stk[this.editData].state
      );
    } else {
      this.addRequirement();
    }
  }
  addStake() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    if (this.dataObject.hasOwnProperty('stk') == false) {
      this.dataObject['stk'] = [];
    }
    if (this.editData == null) {
      this.dataObject['stk'].push({
        ...this.stakeForm.value,
        requirements: this.requirements.map((requirement) => {
          return requirement.value;
        }),
      });
    } else {
      this.dataObject.stk[this.editData].taskdesc =
        this.stakeForm.value.taskdesc;
      // this.dataObject.stk[this.editData].eldesc = this.stakeForm.value.eldesc;
      this.dataObject.stk[this.editData].requirements = this.requirements.map(
        (requirement) => {
          return requirement.value;
        }
      );
      this.dataObject.stk[this.editData].stkmail = this.stakeForm.value.stkmail;
      this.dataObject.stk[this.editData].targetrel =
        this.stakeForm.value.targetrel;
      // this.dataObject.stk[this.editData].opl = this.stakeForm.value.opl;
      this.dataObject.stk[this.editData].state = this.stakeForm.value.state;
    }
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }

  delReq(index: number): void {
    this.dialog
      .open(ConfirmationComponent, {
        disableClose: true,
        data: {
          title: 'Delete Requirement?',
          description: `Confirm delete the requirement ${this.requirements[index].value}?`
        }
      })
      .afterClosed()
      .subscribe((resp) => {
        if (!!resp) this.requirements.splice(index, 1);
      });
  }

  addRequirement(): void {
    this.requirements.push(new FormControl(''));
  }

  close(): void {
    this.dialog
      .open(ConfirmationComponent, {
        disableClose: true,
        data: {
          title: 'Confirm Close!',
          description: `Confirm close dialog without saving?`
        }
      })
      .afterClosed()
      .subscribe((resp) => {
        if (!!resp) this.dialogRef.close();
      });
  }
}
