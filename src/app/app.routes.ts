import { Routes } from '@angular/router';
import { LandingPageComponent } from './Core/Pages/landingPage/landingPage.component';
import { LoginComponent } from './Core/Pages/login/login.component';
import { RegistroComponent } from './Core/Pages/registro/registro.component';
import { HomeComponent } from './Core/Pages/home/home.component';

export const routes: Routes = [

  // Rutas que no tienen el sidebar y el navbar
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {// Rutas con el sidebar y el navbar
    path: '',
    component: HomeComponent, // Home es el layout principal que contiene el Navbar y Sidebar
    children: [
      {
        path: '',
        component: LandingPageComponent, // Carga LandingPage por defecto dentro del Home
      },
      {
        path: 'quienes-somos',
        loadComponent: () =>
          import('./Core/Pages/quienesSomos/quienesSomos.component').then(
            (m) => m.QuienesSomosComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirecciona cualquier ruta no definida al path por defecto
];
