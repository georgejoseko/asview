import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from './addtask/addtask.component';
import { AddstakeComponent } from './addstake/addstake.component';
import { TaskidService } from './taskid.service';
import { AddsystemComponent } from './addsystem/addsystem.component';
import { AddswComponent } from './addsw/addsw.component';
import { AddsyststComponent } from './addsystst/addsystst.component';
import { AddswtstComponent } from './addswtst/addswtst.component';
import { FileSaverService } from 'ngx-filesaver';

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
  constructor(private dialog:MatDialog, private service:TaskidService, private fileSaverService:FileSaverService){}
  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.taskId = this.dataObject.id;
    this.titleRq = this.dataObject.title;
    this.taskExist = (this.dataObject != null);
  }
  browserSaveAs(){
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    const blob = new Blob([JSON.stringify(this.dataObject, null, 2)], {
      type: "application/json",
    });
    this.fileSaverService.save(blob,'data.json');
    
  }
  browserUpload(event:any){
    var file = event.srcElement.files[0];
    
    if (file) {
      var dataString:any
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {       
          dataString = evt.target?.result;
           localStorage.setItem('DATA',dataString); 
        }
        reader.onerror = function (evt) {
            console.log('error reading file');
        }
    }
    location.reload();
    console.log("inside")
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
Openstk(istk:number){
  this.dialog.open(AddstakeComponent,{data:istk}).afterClosed().subscribe(val=>{
    this.ngOnInit();  });
}
delStk(istk:number){
  this.dataString = localStorage.getItem('DATA');
  this.dataObject = JSON.parse(this.dataString);
  this.dataObject.stk.splice(istk,1);
  this.dataString = JSON.stringify(this.dataObject);
  localStorage.setItem('DATA',this.dataString);
  this.ngOnInit();

}
addSys(istk:number){
  this.service.stkid = istk;
  this.dialog.open(AddsystemComponent,{}).afterClosed().subscribe(val=>{
    this.ngOnInit(); 
  });
}
Opensys(isys:number,istk:number){
  this.dialog.open(AddsystemComponent,{data:{isys,istk}}).afterClosed().subscribe(val=>{
    this.ngOnInit();  });
}
delSys(isys:number,istk:number){
  this.dataString = localStorage.getItem('DATA');
  this.dataObject = JSON.parse(this.dataString);
  this.dataObject.stk[istk].system.splice(isys,1);
  this.dataString = JSON.stringify(this.dataObject);
  localStorage.setItem('DATA',this.dataString);
  this.ngOnInit();
}
addSw(isys:number,istk:number){
  this.service.stkid = istk;
  this.service.sysid = isys;
  this.dialog.open(AddswComponent,{}).afterClosed().subscribe(val=>{
    this.ngOnInit(); 
  });
}
Opensw(isw:number,isys:number,istk:number){
  this.dialog.open(AddswComponent,{data:{isw,isys,istk}}).afterClosed().subscribe(val=>{
    this.ngOnInit();  });
}
delSw(isw:number,isys:number,istk:number){
  this.dataString = localStorage.getItem('DATA');
  this.dataObject = JSON.parse(this.dataString);
  this.dataObject.stk[istk].system[isys].software.splice(isw,1);
  this.dataString = JSON.stringify(this.dataObject);
  localStorage.setItem('DATA',this.dataString);
  this.ngOnInit();
}

addSystst(isys:number,istk:number){
  this.service.stkid = istk;
  this.service.sysid = isys;
  this.dialog.open(AddsyststComponent,{}).afterClosed().subscribe(val=>{
    this.ngOnInit(); 
  });
}
Opensystst(isystst:number,isys:number,istk:number){
  this.dialog.open(AddsyststComponent,{data:{isystst,isys,istk}}).afterClosed().subscribe(val=>{
    this.ngOnInit();  });
}
delSystst(isystst:number,isys:number,istk:number){
  this.dataString = localStorage.getItem('DATA');
  this.dataObject = JSON.parse(this.dataString);
  this.dataObject.stk[istk].system[isys].systemtst.splice(isystst,1);
  this.dataString = JSON.stringify(this.dataObject);
  localStorage.setItem('DATA',this.dataString);
  this.ngOnInit();
}
addSwtst(isys:number,istk:number,isw:number){
  this.service.stkid = istk;
  this.service.sysid = isys;
  this.service.swid = isw;
  this.dialog.open(AddswtstComponent,{}).afterClosed().subscribe(val=>{
    this.ngOnInit(); 
  });
}
Openswtst(iswtst:number,isw:number,isys:number,istk:number){
  this.dialog.open(AddswtstComponent,{data:{iswtst,isys,isw,istk}}).afterClosed().subscribe(val=>{
    this.ngOnInit();  });
}
delSwtst(iswtst:number,isw:number,isys:number,istk:number){
  this.dataString = localStorage.getItem('DATA');
  this.dataObject = JSON.parse(this.dataString);
  this.dataObject.stk[istk].system[isys].software[isw].softwaretst.splice(iswtst,1);
  this.dataString = JSON.stringify(this.dataObject);
  localStorage.setItem('DATA',this.dataString);
  this.ngOnInit();
}
}
