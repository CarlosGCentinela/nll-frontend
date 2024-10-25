import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private apiUrl = 'https://demo.nuevoloslagos.org/data'; // URL base de la API

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

   // Obtener datos de la API y manejar respuestas en diferentes formatos
   getData(endpoint: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, {
      ...this.httpOptions,
      responseType: 'text' // Solicitamos la respuesta como texto
    }).pipe(
      map((responseText: string) => {
        try {
          const trimmedResponse = responseText.trim();

          if (trimmedResponse.startsWith('{')) {
            // Caso 1: Múltiples objetos JSON separados por líneas
            const jsonObjects = trimmedResponse.split('\n')
              .filter(line => line.trim().length > 0) // Filtrar líneas vacías
              .map(line => JSON.parse(line));
            return jsonObjects;
          } else if (trimmedResponse.startsWith('[')) {
            // Caso 2: Arreglo JSON válido
            return JSON.parse(trimmedResponse);
          } else {
            // Formato desconocido
            console.error('Formato de respuesta desconocido.');
            return [];
          }
        } catch (e) {
          console.error('Error al parsear la respuesta:', e);
          return []; // Retornamos una lista vacía en caso de error
        }
      }),
      catchError(error => {
        console.error('Error en getData:', error);
        return of([]); // Retornamos una lista vacía en caso de error HTTP
      })
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
