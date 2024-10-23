import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import baserUrl from '../config/helper';


interface JwtPayload {
  id: number;
  username: string;
  role: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string>('');
  private currentUserName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  public login(correo: string, password: string): Observable<any> {
    const loginData = { correo, password };  // Asegúrate de que los nombres de los campos coincidan
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${baserUrl}/usuarios/login`, loginData, { headers }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          this.setToken(token);  // Almacena el token en localStorage
          const decodedToken = jwtDecode<JwtPayload>(token);
          this.currentUserRole.next(decodedToken.role);
          this.currentUserName.next(decodedToken.username);
        }
        return response;
      })
    );
  }



  public register(user: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${baserUrl}/usuarios/register`, user, { headers });
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserRole.next('');
    this.currentUserName.next('');
  }

  public getRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  public getUserName(): Observable<string> {
    return this.currentUserName.asObservable();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      this.currentUserRole.next(decodedToken.role);
      this.currentUserName.next(decodedToken.username);
      this.loggedIn.next(true);
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  public getUsuarioId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      console.log('Token decodificado:', decoded); // Depuración
      return decoded.userId || null;
    }
    return null;
  }
}
