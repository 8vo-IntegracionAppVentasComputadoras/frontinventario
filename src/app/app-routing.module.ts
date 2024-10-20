import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbardComponent } from './modules/global/components/navbard/navbard.component';

const routes: Routes = [
  {
    path: '',
    component: NavbardComponent,
    loadChildren: () => import('./rutas.module').then(m => m.RutasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
