import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from './addtask/addtask.component';
import { AddstakeComponent } from './addstake/addstake.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataObject:any;
  dataString!:any;
  taskId:any;
  titleRq:any;
  taskExist:any;
  constructor(private dialog:MatDialog){}
  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.taskId = this.dataObject.id;
    this.titleRq = this.dataObject.title;
    this.taskExist = (this.dataObject != null);
  }
  addTask(){
    this.dialog.open(AddtaskComponent,{}).afterClosed().subscribe(val=>{
      this.ngOnInit(); 
  });
}
addStake(){
  this.dialog.open(AddstakeComponent,{}).afterClosed().subscribe(val=>{
    this.ngOnInit(); 
});
}
}
