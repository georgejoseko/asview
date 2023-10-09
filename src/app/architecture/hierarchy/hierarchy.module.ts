import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSaverModule } from 'ngx-filesaver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { ElementFormComponent } from './element-form/element-form.component';
import { ImportFormComponent } from './import-form/import-form.component';
import { ConfirmationModule } from 'src/app/confirm-dialog/confirm-dialog.module';
import { AddFormComponent } from './add-form/add-form.component';

@NgModule({
  declarations: [ElementFormComponent, ImportFormComponent, AddFormComponent],
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
    ConfirmationModule,
    MatSortModule
  ],
})
export class HierarchyModule {}
