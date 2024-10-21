// general.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private apiUrl = 'http://localhost:3000/api'; // URL base de tu API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Puedes añadir más cabeceras si es necesario
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(
        `Backend retornó código ${error.status}, ` +
        `cuerpo del error: ${error.error}`);
    }
    return throwError(
      'Algo salió mal; por favor, intenta de nuevo más tarde.');
  }

  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(endpoint: string, id: number | string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteData(endpoint: string, id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método de login real
  login(data: any): Observable<any> {
    return this.postData('login', data);
  }

  // Método de login simulado
  mockLogin(data: any): Observable<any> {
    // Simula una validación de credenciales
    const { email, password } = data;
    if (email === 'test@example.com' && password === 'password') {
      // Simula un token JWT
      const simulatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; 
      return of({ token: simulatedToken }).pipe(
        delay(1000) // Simula un retardo de 1 segundo
      );
    } else {
      return throwError('Credenciales inválidas').pipe(
        delay(1000) // Simula un retardo de 1 segundo
      );
    }
  }
}
