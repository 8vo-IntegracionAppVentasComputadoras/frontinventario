import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto';

import Swal from 'sweetalert2'; // Para las notificaciones

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent {
  productoForm: FormGroup;
  selectedFile: File | null = null;
  base64Image: string | null = null;

  categorias = ['COMPONENTES', 'PERIFERICOS', 'ALMACENAMIENTO', 'COMPUTADORAS'];
  tiposFiltrados: string[] = [];

  tiposPorCategoria = {
    COMPONENTES: [
      'PROCESADOR',
      'TARJETA_GRAFICA',
      'RAM',
      'PLACA_BASE',
      'FUENTE_DE_PODER',
      'DISIPADOR',
      'VENTILADOR',
      'CASE',
    ],
    PERIFERICOS: [
      'MONITOR',
      'TECLADO',
      'MOUSE',
      'IMPRESORA',
      'ALTAVOCES',
      'MICROFONO',
      'CAMARA_WEB',
      'AURICULARES',
    ],
    ALMACENAMIENTO: ['DISCO_DURO', 'SSD', 'MEMORIA_USB', 'TARJETA_SD'],
    COMPUTADORAS: ['PC_SOBREMESA', 'LAPTOP', 'ALL_IN_ONE', 'SERVIDOR'],
  };

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService, // Inyectamos el ProductoService
    public dialogRef: MatDialogRef<FormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  // Método para manejar la selección de la imagen y convertirla a Base64
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Convertir el archivo a Base64
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.base64Image = reader.result as string; // Aquí se obtiene la imagen en formato Base64
      };
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  // Método para crear el producto, incluyendo la imagen en Base64
  crearProducto(): void {
    if (this.productoForm.valid && this.base64Image) {
      const productoData = {
        nombre: this.productoForm.get('nombre')?.value,
        descripcion: this.productoForm.get('descripcion')?.value,
        precio: this.productoForm.get('precio')?.value,
        stock: this.productoForm.get('stock')?.value,
        categoria: this.productoForm.get('categoria')?.value,
        tipo: this.productoForm.get('tipo')?.value,
        imagen: this.base64Image, // Enviar la imagen como Base64
      };

      this.productoService.crearProducto(productoData).subscribe(
        (response: any) => {
          // Especificamos el tipo 'any' para la respuesta
          Swal.fire(
            'Éxito',
            'El producto ha sido creado correctamente.',
            'success'
          );
          this.cerrarModal();
        },
        (error: any) => {
          // Especificamos el tipo 'any' para el error
          Swal.fire('Error', 'Hubo un error al crear el producto.', 'error');
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
      Swal.fire(
        'Error',
        'Por favor, complete todos los campos, incluyendo la imagen.',
        'error'
      );
    }
  }
  onCategoriaChange(): void {
    const categoriaSeleccionada = this.productoForm.get('categoria')
      ?.value as keyof typeof this.tiposPorCategoria;
    if (this.tiposPorCategoria[categoriaSeleccionada]) {
      this.tiposFiltrados = this.tiposPorCategoria[categoriaSeleccionada];
    } else {
      this.tiposFiltrados = [];
    }
    this.productoForm.get('tipo')?.setValue(null); // Limpiar el valor del tipo cuando cambie la categoría
  }

  validarEntradaNumeros(event: KeyboardEvent) {
    const key = event.key;

    // Verifica si la tecla presionada es un número o una tecla permitida como 'Backspace'
    if (!/^[0-9]+$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }
  }

}
