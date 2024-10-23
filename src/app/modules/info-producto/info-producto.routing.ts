import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { UserGuard } from 'src/app/guards/UserGuard';

const routes: Routes = [
  {
    path: ':id',
    component: ProductoDetalleComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoProductoRoutingModule {}
