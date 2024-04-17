import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { DataChartComponent } from './data-chart/data-chart.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {path:'data-chart',component:DataChartComponent,canActivate:[AuthGuardService]},
  {path:'',component:WellcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
