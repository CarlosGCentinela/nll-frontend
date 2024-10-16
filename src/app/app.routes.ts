import { Routes } from '@angular/router';
import { LandingPageComponent } from './Core/Pages/landingPage/landingPage.component';
import { LoginComponent } from './Core/Pages/login/login.component';
import { RegistroComponent } from './Core/Pages/registro/registro.component';
import { HomeComponent } from './Core/Pages/home/home.component';

export const routes: Routes = [

  // Rutas que no incluyen el sidebar ni el navbar
  {
    path: 'login',
    component: LoginComponent, // Ruta de login
  },
  {
    path: 'registro',
    component: RegistroComponent, // Ruta de registro
  },

  // Ruta principal que incluye el sidebar y el navbar
  {
    path: '',
    component: HomeComponent, // El layout principal (HomeComponent) contiene el navbar y sidebar
    children: [
      {
        path: '',
        component: LandingPageComponent, // Página de inicio por defecto dentro de HomeComponent
      },
      {
        path: 'quienes-somos',
        loadComponent: () => 
          import('./Core/Pages/quienesSomos/quienesSomos.component').then(
            (m) => m.QuienesSomosComponent
          ), // Carga el componente QuienesSomos de forma asíncrona
      },
    ],
  },

  // Ruta comodín: redirige cualquier ruta no definida al path por defecto
  { 
    path: '**', 
    redirectTo: '' 
  },
];
