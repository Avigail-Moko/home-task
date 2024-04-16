import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { DataChartComponent } from './data-chart/data-chart.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'data-chart',component:DataChartComponent},
  {path:'',component:WellcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
