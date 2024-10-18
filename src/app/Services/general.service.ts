// general.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // Importar HttpClient y HttpHeaders
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private apiUrl = 'http://localhost:3000/api'; // URL base de tu API

  // Opciones de cabecera para las solicitudes HTTP
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Puedes añadir más cabeceras si es necesario, como tokens de autenticación
    })
  };

  constructor(private http: HttpClient) { }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(
        `Backend retornó código ${error.status}, ` +
        `cuerpo del error: ${error.error}`);
    }
    // Retornar un observable con un mensaje de error amigable
    return throwError(
      'Algo salió mal; por favor, intenta de nuevo más tarde.');
  }

  // Método GET: Obtener datos
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método POST: Enviar datos
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método PUT: Actualizar datos
  updateData(endpoint: string, id: number | string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método DELETE: Eliminar datos
  deleteData(endpoint: string, id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
