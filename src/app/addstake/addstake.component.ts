import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addstake',
  templateUrl: './addstake.component.html',
  styleUrls: ['./addstake.component.scss']
})
export class AddstakeComponent implements OnInit {

  stakeForm !:FormGroup;
  dataObject!:any;
  dataString!:any;
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {    this.stakeForm = this.formBuilder.group({
    taskdesc:['',Validators.required],
    eldesc:['',Validators.required],
    stkmail:['',Validators.required],
    targetrel:['',Validators.required],
    opl:['',Validators.required],
    state:['',Validators.required]
  })
    // this.api.getTask().subscribe({
    //   next:(res)=>{
    //     this.descForm.controls['taskdesc'].setValue(res[this.service.tasknum].stk[this.editData].taskdesc);
    //     this.descForm.controls['eldesc'].setValue(res[this.service.tasknum].stk[this.editData].eldesc);
    //     this.descForm.controls['stkmail'].setValue(res[this.service.tasknum].stk[this.editData].stkmail);
    //     this.descForm.controls['targetrel'].setValue(res[this.service.tasknum].stk[this.editData].targetrel);
    //     this.descForm.controls['opl'].setValue(res[this.service.tasknum].stk[this.editData].opl);
    //     this.descForm.controls['state'].setValue(res[this.service.tasknum].stk[this.editData].state);
    //   }
    // });
  }
  addStake(){
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    if (this.dataObject.hasOwnProperty("stk") == false){
      this.dataObject["stk"] = [];
    }
    // if(this.editData == null){
      this.dataObject["stk"].push(this.stakeForm.value);
      console.log(this.editData)
    // }
    // else{
    //   this.dataObject.stk[this.editData].taskdesc = this.stakeForm.value.taskdesc;
    //   this.dataObject.stk[this.editData].eldesc = this.stakeForm.value.eldesc;
    //   this.dataObject.stk[this.editData].stkmail = this.stakeForm.value.stkmail;
    //   this.dataObject.stk[this.editData].targetrel = this.stakeForm.value.targetrel;
    //   this.dataObject.stk[this.editData].opl = this.stakeForm.value.opl;
    //   this.dataObject.stk[this.editData].state = this.stakeForm.value.state;
    // }
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA',this.dataString);
    this.ngOnInit();
        
  }

}
