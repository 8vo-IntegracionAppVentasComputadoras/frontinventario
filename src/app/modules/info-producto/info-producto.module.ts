import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { MatCardModule } from '@angular/material/card';
import { GlobalModule } from '../global/global.module';
import { InfoProductoRoutingModule } from './info-producto.routing';
import { MatGridListModule } from '@angular/material/grid-list'; // Importa MatGridListModule
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ProductoDetalleComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    InfoProductoRoutingModule,
    MatGridListModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,



    GlobalModule,

  ],
  exports: [
    ProductoDetalleComponent
  ]
})
export class InfoProductoModule { }
