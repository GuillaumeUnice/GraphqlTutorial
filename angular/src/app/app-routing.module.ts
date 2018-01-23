import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DashboardPageComponent }  from './containers/dashboard-page/dashboard-page.component';
import { TaskPageComponent }  from './containers/task-page/task-page.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'detail/:id', component: TaskPageComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
