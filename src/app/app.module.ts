import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSaverModule } from 'ngx-filesaver';

import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddtaskComponent } from './addtask/addtask.component';
import { AddstakeComponent } from './addstake/addstake.component';
import { AddsystemComponent } from './addsystem/addsystem.component';
import { AddswComponent } from './addsw/addsw.component';
import { AddsyststComponent } from './addsystst/addsystst.component';
import { AddswtstComponent } from './addswtst/addswtst.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisFormComponent } from './analysis/form/analysis-form.component';
import { InfoComponent } from './info-dialog/info-dialog.component';
import { ReportComponent } from './report/report.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { ArchitectureFormComponent } from './architecture/form/architecture-form.component';
import { HierarchyComponent } from './architecture/hierarchy/hierarchy.component';
import { HierarchyModule } from './architecture/hierarchy/hierarchy.module';
import { ConfirmationModule } from './confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    AddstakeComponent,
    AddsystemComponent,
    AddswComponent,
    AddsyststComponent,
    AddswtstComponent,
    AnalysisComponent,
    AnalysisFormComponent,
    ReportComponent,
    ArchitectureComponent,
    ArchitectureFormComponent,
    HierarchyComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    FileSaverModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    HierarchyModule,
    ConfirmationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
