import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskidService } from '../taskid.service';

@Component({
  selector: 'app-addswtst',
  templateUrl: './addswtst.component.html',
  styleUrls: ['./addswtst.component.scss']
})
export class AddswtstComponent implements OnInit {
  swtstForm !:FormGroup;
  dataObject!:any;
  dataString!:any;
  arrindxstk !:number;
  arrindxsys !:number;
  arridswtst !:number;
  constructor(private service:TaskidService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {    this.swtstForm = this.formBuilder.group({
    taskdesc:['',Validators.required],
    stkmail:['',Validators.required],
    swcomp:['',Validators.required],
    env:['',Validators.required],
    state:['',Validators.required],
   })
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.swtstForm.controls['taskdesc'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].taskdesc);
    this.swtstForm.controls['stkmail'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].stkmail);
    this.swtstForm.controls['swcomp'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].swcomp);
    this.swtstForm.controls['env'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].env);
    this.swtstForm.controls['state'].setValue(this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].state);
  }
  addSwtst(){
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.arrindxstk = this.service.stkid;
    this.arrindxsys = this.service.sysid;
    this.arridswtst = this.service.swid;
    if (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys].software[this.arridswtst].hasOwnProperty("softwaretst") == false){
      (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys].software[this.arridswtst])["softwaretst"] = [];
    }
    if(this.editData == null){
      (this.dataObject.stk[this.arrindxstk].system[this.arrindxsys].software[this.arridswtst])["softwaretst"].push(this.swtstForm.value);
    }
    else{
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].taskdesc = this.swtstForm.value.taskdesc;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].stkmail = this.swtstForm.value.stkmail;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].swcomp = this.swtstForm.value.swcomp;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].env = this.swtstForm.value.env;
      this.dataObject.stk[this.editData.istk].system[this.editData.isys].software[this.editData.isw].softwaretst[this.editData.iswtst].state = this.swtstForm.value.state;
    }
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA',this.dataString);
    this.ngOnInit();
  }

}
