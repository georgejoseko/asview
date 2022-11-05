import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskidService } from '../taskid.service';

@Component({
  selector: 'app-addsw',
  templateUrl: './addsw.component.html',
  styleUrls: ['./addsw.component.scss']
})
export class AddswComponent implements OnInit {
  swForm !:FormGroup;
  dataObject!:any;
  dataString!:any;
  arrindxstk !:number;
  arrindxsys !:number;
  constructor(private service:TaskidService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {    this.swForm = this.formBuilder.group({
    taskdesc:['',Validators.required],
    inter:['',Validators.required],
    comp:['',Validators.required],
    stkmail:['',Validators.required],
    swcomp:['',Validators.required],
    swsubcomp:['',Validators.required],
    tag:['',Validators.required],
    url:['',Validators.required]
   })
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.swForm.controls['taskdesc'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].taskdesc);
    this.swForm.controls['inter'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].inter);
    this.swForm.controls['comp'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].comp);
    this.swForm.controls['stkmail'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].stkmail);
    this.swForm.controls['swcomp'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].swcomp);
    this.swForm.controls['swsubcomp'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].swsubcomp);
    this.swForm.controls['tag'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].tag);
    this.swForm.controls['url'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].url);
  }
  addSw(){
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.arrindxstk = this.service.stkid;
    this.arrindxsys = this.service.sysid;
    if (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys].hasOwnProperty("software") == false){
      (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys])["software"] = [];
    }
    if(this.editData == null){
      (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys])["software"].push(this.swForm.value);
    }
    else{
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].taskdesc = this.swForm.value.taskdesc;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].inter = this.swForm.value.inter;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].comp = this.swForm.value.comp;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].stkmail = this.swForm.value.stkmail;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].swcomp = this.swForm.value.swcomp;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].swsubcomp = this.swForm.value.swsubcomp;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].tag = this.swForm.value.tag;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].url = this.swForm.value.url;
    }
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA',this.dataString);
    this.ngOnInit();
  }
}
