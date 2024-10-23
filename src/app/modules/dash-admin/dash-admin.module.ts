import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminRoutingModule } from './dash-admin-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DashTablaComponent } from './components/dash-tabla/dash-tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GlobalModule } from '../global/global.module';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioProductoComponent } from './components/formulario-producto/formulario-producto.component';
import { MatSelectModule } from '@angular/material/select';
import { AgregarStockComponent } from './components/agregar-stock/agregar-stock.component';
import { ReducirStockComponent } from './components/reducir-stock/reducir-stock.component';

@NgModule({
  declarations: [
    DashTablaComponent,
    FormularioProductoComponent,
    AgregarStockComponent,
    ReducirStockComponent
  ],
  imports: [
    CommonModule,
    DashAdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,

    GlobalModule
  ]
})
export class DashAdminModule { }
