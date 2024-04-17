import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataChartComponent } from './data-chart/data-chart.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    WellcomeComponent,
    DashboardComponent,
    DataChartComponent,
    AdminDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ColorPickerModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    CanvasJSAngularChartsModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
