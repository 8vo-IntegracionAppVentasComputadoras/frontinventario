import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto, ProductoService } from 'src/app/services/producto';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { Transaccion, TransaccionService } from 'src/app/services/transaccion';
import { AgregarStockComponent } from '../agregar-stock/agregar-stock.component';
import { ReducirStockComponent } from '../reducir-stock/reducir-stock.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-tabla',
  templateUrl: './dash-tabla.component.html',
  styleUrls: ['./dash-tabla.component.css'],
})
export class DashTablaComponent implements OnInit {
  displayedColumns: string[] = [
    'formattedId',
    'nombreProducto',
    'precio',
    'categoria',
    'tipo',
    'stock',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Producto>();
  productoForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private transaccionService: TransaccionService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
    });

    // Suscribirse al BehaviorSubject para recibir la lista de productos en tiempo real
    this.productoService.productos$.subscribe(
      (productos: Producto[]) => {
        this.dataSource.data = productos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(
          'Error al obtener la lista de productos en tiempo real',
          error
        );
      }
    );

    // Cargar la lista inicial de productos desde el backend
    this.productoService.listarProductos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    // Si el valor de búsqueda es pequeño, aplicamos el filtro local
    if (filterValue.length < 3) {
      this.dataSource.filter = filterValue;
    } else {
      // Si es mayor, buscamos en el backend
      this.productoService.buscarProductosPorNombre(filterValue).subscribe(
        (productos) => {
          this.dataSource.data = productos;
        },
        (error) => {
          console.error('Error al buscar productos', error);
        }
      );
    }
  }

  abrirFormularioProducto() {
    const dialogRef = this.dialog.open(FormularioProductoComponent, {
      width: '500px',
    });

    // Escuchar cuando el modal se cierra y obtener los datos de producto
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si hay resultado, significa que se envió un nuevo producto
        this.crearProducto(result);
      }
    });
  }

  cerrarModal() {
    this.dialog.closeAll();
  }

  // Este método recibe el producto desde el modal y lo guarda
  crearProducto(nuevoProducto: any) {
    this.productoService.crearProducto(nuevoProducto).subscribe(
      (response) => {
        Swal.fire(
          'Éxito',
          'El producto ha sido creado correctamente.',
          'success'
        );
        // Actualiza la tabla añadiendo el nuevo producto
        this.dataSource.data = [...this.dataSource.data, response];
      },
      (error) => {
        Swal.fire('Error', 'Hubo un error al crear el producto.', 'error');
        console.error('Error al crear el producto:', error);
      }
    );
  }

  // Función para eliminar un producto
  eliminarProducto(id: number) {
    // Mostrar un cuadro de diálogo de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama al servicio para eliminar el producto
        this.productoService.eliminarProducto(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'El producto ha sido eliminado correctamente.',
              'success'
            );
            // Actualizar la lista de productos después de la eliminación
            this.dataSource.data = this.dataSource.data.filter(
              (producto) => Number(producto.id) !== id
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el producto.',
              'error'
            );
            console.error('Error al eliminar el producto:', error);
          }
        );
      }
    });
  }
  // Método para abrir el modal y agregar stock
  agregarStock(productoId: number) {
    const dialogRef = this.dialog.open(AgregarStockComponent, {
      width: '400px',
      data: { productoId }, // Pasamos el id del producto al modal
    });

    dialogRef.afterClosed().subscribe((cantidad) => {
      if (cantidad) {
        const transaccionData: Transaccion = {
          productosIds: [productoId],
          cantidadTotal: cantidad,
          tipo: 'ENTRADA',
        };

        this.transaccionService.registrarEntrada(transaccionData).subscribe(
          () => {
            Swal.fire('Éxito', 'Stock incrementado correctamente.', 'success');
            // Actualizar la lista de productos para reflejar el nuevo stock
            this.productoService.listarProductos(); // Recargar productos
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un error al incrementar el stock.',
              'error'
            );
            console.error('Error al incrementar stock:', error);
          }
        );
      }
    });
  }

  // Método para reducir el stock del producto
  // Método para abrir el modal y reducir stock
  reducirStock(productoId: number) {
    const dialogRef = this.dialog.open(ReducirStockComponent, {
      width: '400px',
      data: { productoId }, // Pasamos el id del producto al modal
    });

    dialogRef.afterClosed().subscribe((cantidad) => {
      if (cantidad) {
        const transaccionData: Transaccion = {
          productosIds: [productoId],
          cantidadTotal: cantidad,
          tipo: 'SALIDA', // Tipo de transacción es una salida
        };

        this.transaccionService.registrarSalida(transaccionData).subscribe(
          () => {
            Swal.fire('Éxito', 'Stock reducido correctamente.', 'success');
            this.productoService.listarProductos(); // Recargar la lista de productos
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un error al reducir el stock.',
              'error'
            );
            console.error('Error al reducir stock:', error);
          }
        );
      }
    });
  }

  verDetallesProducto(productoId: number) {
    this.router.navigate([`/info-producto`, productoId]); 
  }


}
