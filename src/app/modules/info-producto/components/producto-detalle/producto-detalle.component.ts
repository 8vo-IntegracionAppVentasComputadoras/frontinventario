import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y FormGroup
import { ActivatedRoute } from '@angular/router';
import { ProductoService, Producto } from 'src/app/services/producto';
import { Location } from '@angular/common';


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  productoId!: number;
  producto!: Producto | undefined;
  productoForm!: FormGroup; // Formulario para la edición
  editando = false;
  imagenSeleccionada: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private location: Location// FormBuilder para crear el formulario
  ) {}
  goBack(): void {
    this.location.back(); // Navegar hacia atrás
  }
  ngOnInit() {
    // Inicializamos el formulario con valores vacíos
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required]
    });

    // Obtener el id del producto desde la URL
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));

    // Llamar al método listarProductos y filtrar el producto por su ID
    this.productoService.listarProductos();

    // Suscribirse al BehaviorSubject para recibir la lista de productos en tiempo real
    this.productoService.productos$.subscribe(
      (productos: Producto[]) => {
        this.producto = productos.find(p => p.id === this.productoId);
        if (this.producto) {
          // Actualizamos el formulario con los valores actuales del producto
          this.productoForm.patchValue({
            nombre: this.producto.nombre,
            precio: this.producto.precio,
            stock: this.producto.stock,
            descripcion: this.producto.descripcion
          });
        }
      },
      (error) => {
        console.error('Error al obtener los detalles del producto', error);
      }
    );
  }

  habilitarEdicion() {
    this.editando = true;
  }

  guardarCambios() {
    if (this.productoForm.valid && this.producto) {
      // Crear un objeto actualizado con los valores del formulario, usando valores originales si no hay cambios
      const productoActualizado: Producto = {
        id: this.producto.id,
        nombre: this.productoForm.value.nombre ?? this.producto.nombre, // Usar el valor del formulario o el original
        precio: this.productoForm.value.precio ?? this.producto.precio,
        stock: this.productoForm.value.stock ?? this.producto.stock,
        descripcion: this.productoForm.value.descripcion ?? this.producto.descripcion,
        categoria: this.producto.categoria, // Mantener la categoría original
        tipo: this.producto.tipo, // Mantener el tipo original
        imagen: this.imagenSeleccionada || this.producto.imagen // Usar la imagen seleccionada o mantener la original
      };

      // Llamar al servicio para actualizar el producto
      this.productoService.actualizarProducto(this.productoId, productoActualizado).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          this.editando = false;

          // Actualizar el producto con los nuevos valores en caso de éxito
          this.producto = productoActualizado; // Actualizar el producto en el componente
        },
        (error) => {
          console.error('Error al actualizar el producto', error);
        }
      );
    }
  }





  cancelarEdicion() {
    this.editando = false;
    if (this.producto) {
      // Restauramos los valores del producto original si se cancela la edición
      this.productoForm.patchValue({
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        stock: this.producto.stock,
        descripcion: this.producto.descripcion
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenSeleccionada = e.target.result as string; // Obtener la imagen como base64

        // Asignar la imagen base64 al producto si es válido
        if (this.imagenSeleccionada && this.producto) {
          this.producto.imagen = this.imagenSeleccionada;
        }
      };
      reader.readAsDataURL(file); // Convertir la imagen a base64
    }
  }


}
