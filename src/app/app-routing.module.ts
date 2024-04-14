import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WellcomeComponent } from './wellcome/wellcome.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'',component:WellcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
