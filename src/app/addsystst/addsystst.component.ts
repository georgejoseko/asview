import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskidService } from '../taskid.service';

@Component({
  selector: 'app-addsystst',
  templateUrl: './addsystst.component.html',
  styleUrls: ['./addsystst.component.scss']
})
export class AddsyststComponent implements OnInit {
  syststForm !:FormGroup;
  dataObject!:any;
  dataString!:any;
  arrindxstk !:number;
  arrindxsys !:number;
  constructor(private service:TaskidService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {    this.syststForm = this.formBuilder.group({
    taskdesc:['',Validators.required],
    stkmail:['',Validators.required],
    swcomp:['',Validators.required],
    env:['',Validators.required],
    state:['',Validators.required],
   })
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.syststForm.controls['taskdesc'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].taskdesc);
    this.syststForm.controls['stkmail'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].stkmail);
    this.syststForm.controls['swcomp'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].swcomp);
    this.syststForm.controls['env'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].env);
    this.syststForm.controls['state'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].state);
  }
  addSystst(){
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.arrindxstk = this.service.stkid;
    this.arrindxsys = this.service.sysid;
    if (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys].hasOwnProperty("systemtst") == false){
      (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys])["systemtst"] = [];
    }
    if(this.editData == null){
      (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys])["systemtst"].push(this.syststForm.value);
    }
    else{
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].taskdesc = this.syststForm.value.taskdesc;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].stkmail = this.syststForm.value.stkmail;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].swcomp = this.syststForm.value.swcomp;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].env = this.syststForm.value.env;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].systemtst[this.editData.isystst].state = this.syststForm.value.state;
    }
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA',this.dataString);
    this.ngOnInit();
  }
}