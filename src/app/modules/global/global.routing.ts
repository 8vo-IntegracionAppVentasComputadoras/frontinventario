import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbardComponent } from './components/navbard/navbard.component';
import { LoginComponent } from './components/login/login.component';


export const globalRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavbardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(globalRoutes)],  // Usar forChild en lugar de forRoot
  exports: [RouterModule]
})
export class GlobalRoutingModule {}
