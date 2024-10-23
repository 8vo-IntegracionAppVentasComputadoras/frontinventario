import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/global/global.module').then((m) => m.GlobalModule),
  },
  {
    path: 'dash-admin',
    loadChildren: () =>
      import('./modules/dash-admin/dash-admin.module').then(
        (m) => m.DashAdminModule
      ),
  },

  {
    path: 'info-producto',
    loadChildren: () =>
      import('./modules/info-producto/info-producto.module').then(
        (m) => m.InfoProductoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
