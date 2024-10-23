import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import baserUrl from '../config/helper';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoria: string;
  tipo: string;
}
export interface ProductoUpdateDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiBaseUrl = `${baserUrl}/api/productos`;

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para crear un producto y actualizar la lista en el BehaviorSubject
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiBaseUrl}/crear`, producto).pipe(
      tap((nuevoProducto: Producto) => {
        // Obtener la lista actual de productos
        const productosActuales = this.productosSubject.getValue();
        // Añadir el nuevo producto a la lista
        this.productosSubject.next([...productosActuales, nuevoProducto]);
      })
    );
  }

  // Método para obtener la lista inicial de productos desde el backend
  listarProductos(): void {
    this.http.get<Producto[]>(`${this.apiBaseUrl}/listar`).subscribe(
      (productos) => {
        // Actualizar el BehaviorSubject con la lista obtenida
        this.productosSubject.next(productos);
      },
      (error) => {
        console.error('Error al listar productos', error);
      }
    );
  }

  // Método para eliminar un producto
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/eliminar/${id}`).pipe(
      tap(() => {
        // Actualizar el BehaviorSubject eliminando el producto
        const productosActuales = this.productosSubject.getValue();
        const productosActualizados = productosActuales.filter(
          (producto) => producto.id !== id
        );
        this.productosSubject.next(productosActualizados);
      })
    );
  }

  // Método para buscar productos por nombre
  buscarProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.apiBaseUrl}/buscar?nombre=${nombre}`
    );
  }
  // Servicio para actualizar un producto en producto.service.ts

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiBaseUrl}/actualizar/${id}`, producto).pipe(
      tap((respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
      })
    );
  }


  // Método para obtener un producto por ID
  obtenerProductoPorId(id: number) {
    return this.http.get<Producto>(`${this.apiBaseUrl}/productos/${id}`);
  }
}
