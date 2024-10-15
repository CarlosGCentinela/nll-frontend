import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar el módulo
import { importProvidersFrom } from '@angular/core'; // Necesario para standalone

import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule) // Proveer el BrowserAnimationsModule
  ],
}).catch(err => console.error(err));
