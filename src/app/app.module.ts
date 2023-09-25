import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSaverModule } from 'ngx-filesaver';

import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddtaskComponent } from './addtask/addtask.component';
import { AddstakeComponent } from './addstake/addstake.component';
import { AddsystemComponent } from './addsystem/addsystem.component';
import { AddswComponent } from './addsw/addsw.component';
import { AddsyststComponent } from './addsystst/addsystst.component';
import { AddswtstComponent } from './addswtst/addswtst.component';
import { ConfirmationComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    AddstakeComponent,
    AddsystemComponent,
    AddswComponent,
    AddsyststComponent,
    AddswtstComponent,
    ConfirmationComponent
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
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
