import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css'],
})
export class AgregarStockComponent {
  stockForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos del producto que se va a modificar
  ) {
    this.stockForm = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Cierra el modal sin hacer nada
  cerrarModal(): void {
    this.dialogRef.close();
  }

  // Cierra el modal pasando la cantidad de stock ingresada
  agregarStock(): void {
    if (this.stockForm.valid) {
      this.dialogRef.close(this.stockForm.get('cantidad')?.value);
    }
  }
}
