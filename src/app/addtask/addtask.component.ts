import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  taskForm !:FormGroup;
  dataObject!:any;
  dataString!:any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskid:['',Validators.required],
      title:['',Validators.required]
    })
  }
  addTask(){
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
      this.dataObject = {};
      this.dataObject["id"] = this.taskForm.value.taskid;
      this.dataObject["title"] = this.taskForm.value.title;
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA',this.dataString);
    this.ngOnInit();
  }


}
