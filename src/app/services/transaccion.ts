import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';

export interface Transaccion {
  productosIds: number[];
  cantidadTotal: number;
  tipo: string; // "ENTRADA" o "SALIDA"
}

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private apiBaseUrl = `${baserUrl}/api/transacciones`;

  constructor(private http: HttpClient) { }

  registrarEntrada(transaccion: Transaccion): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/entrada`, transaccion);
  }

  registrarSalida(transaccion: Transaccion): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/salida`, transaccion);
  }
}
