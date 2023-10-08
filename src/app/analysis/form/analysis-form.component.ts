import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Analysis } from '../types';
import { ConfirmationComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-analysis-form',
  templateUrl: './analysis-form.component.html',
  styleUrls: ['./analysis-form.component.scss'],
})
export class AnalysisFormComponent implements OnInit {
  analysisForm!: FormGroup;
  dataObject!: any;
  dataString!: any;
  analysisId!: number;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public editData: { analysis: Analysis; newId: number },
    private dialogRef: MatDialogRef<AnalysisFormComponent>
  ) {}

  ngOnInit(): void {
    this.analysisForm = this.formBuilder.group({
      description: ['', Validators.required],
      comment: [''],
      status: [''],
      referance: [''],
    });
    if (!!this.editData) {
      if (!!this.editData.newId) {
        this.analysisId = this.editData.newId;
      } else {
        this.analysisId = this.editData.analysis.id;
        this.analysisForm.patchValue(this.editData.analysis);
      }
    }
  }
  addAnalysis() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    if (!this.dataObject['analysis']) this.dataObject['analysis'] = {};
    this.dataObject.analysis[this.analysisId] = {
      ...this.analysisForm.value,
      id: this.analysisId,
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
