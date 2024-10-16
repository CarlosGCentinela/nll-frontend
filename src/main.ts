import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar el módulo de animaciones del navegador
import { importProvidersFrom } from '@angular/core'; // Importar proveedores necesarios para aplicaciones standalone

import { routes } from './app/app.routes'; // Importar las rutas definidas

// Inicializar la aplicación con el componente principal y proveedores necesarios
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Proveer las rutas de la aplicación
    importProvidersFrom(BrowserAnimationsModule) // Proveer el módulo de animaciones del navegador
  ],
}).catch(err => console.error(err)); // Capturar y manejar errores de inicialización
