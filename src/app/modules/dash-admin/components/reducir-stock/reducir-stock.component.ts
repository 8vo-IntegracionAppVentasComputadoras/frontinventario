import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reducir-stock',
  templateUrl: './reducir-stock.component.html',
  styleUrls: ['./reducir-stock.component.css']
})
export class ReducirStockComponent {
  reducirStockForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReducirStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.reducirStockForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });
  }


  onCancelar(): void {
    this.dialogRef.close();
  }

  onConfirmar(): void {
    if (this.reducirStockForm.valid) {
      const cantidadReducida = this.reducirStockForm.value.cantidad;
      this.dialogRef.close(cantidadReducida); 
    }
  }
}
