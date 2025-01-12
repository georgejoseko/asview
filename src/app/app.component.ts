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
import { ConfirmationComponent } from './confirm-dialog/confirm-dialog.component';
import { lastValueFrom } from 'rxjs';
import { AnalysisComponent } from './analysis/analysis.component';
import { InfoComponent } from './info-dialog/info-dialog.component';
import { ReportComponent } from './report/report.component';
import { ArchitectureComponent } from './architecture/architecture.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataObject: any;
  dataString!: any;
  taskId: any;
  titleRq: any;
  taskExist: any;
  stkcardExpanded: boolean = true;
  syscardExpanded: boolean = true;
  syststcardExpanded: boolean = true;
  swrcardExpanded: boolean = true;
  constructor(
    private dialog: MatDialog,
    private service: TaskidService,
    private fileSaverService: FileSaverService
  ) {}
  ngOnInit(): void {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.taskExist = !!this.dataObject;
    if (this.taskExist) {
      this.taskId = this.dataObject.id;
      this.titleRq = this.dataObject.title;
    }
  }
  browserSaveAs() {
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    const blob = new Blob([JSON.stringify(this.dataObject, null, 2)], {
      type: 'application/json',
    });
    this.fileSaverService.save(blob, 'data.json');
  }
  browserUpload(event: any) {
    var file = event.srcElement.files[0];

    if (file) {
      var dataString: any;
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (evt) {
        dataString = evt.target?.result;
        localStorage.setItem('DATA', dataString);
      };
      reader.onerror = function (evt) {
        console.log('error reading file');
      };
    }
    location.reload();
  }
  addTask() {
    this.dialog
      .open(AddtaskComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  addStake() {
    this.dialog
      .open(AddstakeComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  Openstk(istk: number) {
    this.dialog
      .open(AddstakeComponent, { disableClose: true, data: istk })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  async delStk(istk: number) {
    if (!(await this.getConfirmation())) return;
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.dataObject.stk.splice(istk, 1);
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }
  addSys(istk: number) {
    this.service.stkid = istk;
    this.dialog
      .open(AddsystemComponent, { disableClose: true })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  Opensys(isys: number, istk: number) {
    this.dialog
      .open(AddsystemComponent, { disableClose: true, data: { isys, istk } })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  async delSys(isys: number, istk: number) {
    if (!(await this.getConfirmation())) return;
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.dataObject.stk[istk].system.splice(isys, 1);
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }
  addSw(isys: number, istk: number) {
    this.service.stkid = istk;
    this.service.sysid = isys;
    this.dialog
      .open(AddswComponent, { disableClose: true })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  Opensw(isw: number, isys: number, istk: number) {
    this.dialog
      .open(AddswComponent, { disableClose: true, data: { isw, isys, istk } })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  async delSw(isw: number, isys: number, istk: number) {
    if (!(await this.getConfirmation())) return;
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.dataObject.stk[istk].system[isys].software.splice(isw, 1);
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }

  addSystst(isys: number, istk: number) {
    this.service.stkid = istk;
    this.service.sysid = isys;
    this.dialog
      .open(AddsyststComponent, { disableClose: true })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  Opensystst(isystst: number, isys: number, istk: number) {
    this.dialog
      .open(AddsyststComponent, {
        disableClose: true,
        data: { isystst, isys, istk },
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  async delSystst(isystst: number, isys: number, istk: number) {
    if (!(await this.getConfirmation())) return;
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.dataObject.stk[istk].system[isys].systemtst.splice(isystst, 1);
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }
  addSwtst(isys: number, istk: number, isw: number) {
    this.service.stkid = istk;
    this.service.sysid = isys;
    this.service.swid = isw;
    this.dialog
      .open(AddswtstComponent, { disableClose: true })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  Openswtst(iswtst: number, isw: number, isys: number, istk: number) {
    this.dialog
      .open(AddswtstComponent, {
        disableClose: true,
        data: { iswtst, isys, isw, istk },
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  async delSwtst(iswtst: number, isw: number, isys: number, istk: number) {
    if (!(await this.getConfirmation())) return;
    this.dataString = localStorage.getItem('DATA');
    this.dataObject = JSON.parse(this.dataString);
    this.dataObject.stk[istk].system[isys].software[isw].softwaretst.splice(
      iswtst,
      1
    );
    this.dataString = JSON.stringify(this.dataObject);
    localStorage.setItem('DATA', this.dataString);
    this.ngOnInit();
  }

  getConfirmation(): Promise<boolean> {
    return lastValueFrom(
      this.dialog
        .open(ConfirmationComponent, {
          disableClose: true,
          data: {
            title: 'Confirm Delete?',
            description: `Confirm deleting the task?`,
          },
        })
        .afterClosed()
    );
  }

  editTask() {
    this.dialog
      .open(AddtaskComponent, { disableClose: true, data: { isEdit: true } })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }

  onAnalysis(): void {
    if (!this.taskExist) {
      this.onInfo('No Task Avalable', 'Add a task before doing analysis!');
      return;
    }
    this.dialog.open(AnalysisComponent, {
      disableClose: true,
      width: '70vw',
      height: '70vh',
      minWidth: '720px',
      minHeight: '500px',
    });
  }

  onArchitecture(): void {
    if (!this.taskExist) {
      this.onInfo('No Task Avalable', 'Add a task before doing analysis!');
      return;
    }
    this.dialog.open(ArchitectureComponent, {
      disableClose: true,
      width: '70vw',
      height: '70vh',
      minWidth: '720px',
      minHeight: '500px',
    });
  }

  onReport(): void {
    if (!this.taskExist) {
      this.onInfo('No Task Avalable', 'Add a task before adding report!');
      return;
    }
    this.dialog.open(ReportComponent, { disableClose: true });
  }

  onInfo(title: string, description: string): void {
    this.dialog.open(InfoComponent, {
      disableClose: true,
      data: { title, description },
    });
  }
}
