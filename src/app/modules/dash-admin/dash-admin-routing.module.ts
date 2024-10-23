import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashTablaComponent } from './components/dash-tabla/dash-tabla.component';
import { UserGuard } from 'src/app/guards/UserGuard';


const routes: Routes = [
  {
    path: '',
    component: DashTablaComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashAdminRoutingModule { }
