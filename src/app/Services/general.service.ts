import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private apiUrl = 'http://webapi.nuevoloslagos.org/api'; // URL base de la API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // BehaviorSubject para rastrear el estado de autenticación
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { 
    // Inicializar el estado de autenticación basado en el token en localStorage
    const token = localStorage.getItem('authToken');
    this.isLoggedInSubject.next(!!token);
  }

  // Manejar los errores de la API
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(
        `Backend retornó código ${error.status}, ` +
        `cuerpo del error: ${error.error}`);
    }
    return throwError('Algo salió mal; por favor, intenta de nuevo más tarde.');
  }

  // Obtener datos de la API
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Enviar datos a la API
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Actualizar datos en la API
  updateData(endpoint: string, id: number | string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Eliminar datos de la API
  deleteData(endpoint: string, id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Lógica común para manejar el token y actualizar estado de autenticación
  private manejarToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  // Método de login real
  login(data: any): Observable<any> {
    return this.postData('login', data).pipe(
      tap(response => {
        if (response.token) {
          this.manejarToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método de login simulado
  mockLogin(data: any): Observable<any> {
    const { email, password } = data;
    if (email === 'test@example.com' && password === 'password') {
      const simulatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; 
      return of({ token: simulatedToken }).pipe(
        delay(1000),
        tap(response => {
          this.manejarToken(response.token);
        })
      );
    } else {
      return throwError('Credenciales inválidas').pipe(
        delay(1000)
      );
    }
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
    // Opcional: Navegar al login o home
  }
}
