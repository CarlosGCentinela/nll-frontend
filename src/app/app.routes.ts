import { Routes } from '@angular/router';
import { LandingPageComponent } from './Core/Pages/landingPage/landingPage.component';
import { LoginComponent } from './Core/Pages/login/login.component';
import { RegistroComponent } from './Core/Pages/registro/registro.component';
import { HomeComponent } from './Core/Pages/home/home.component';
import { ModeloComponent } from './Core/Pages/modelo/modelo.component';
import { BuscadorComponent } from './Core/Pages/buscador/buscador.component';
import { BuscadorDetalleComponent } from './Core/Pages/buscador-detalle/buscador-detalle.component';

export const routes: Routes = [
  // Rutas que no incluyen el sidebar ni el navbar
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Ruta principal que incluye el sidebar y el navbar
  { 
    path: '', 
    component: HomeComponent, 
    children: [
      { path: '', component: LandingPageComponent }, // Página de inicio por defecto

      { 
        path: 'quienes-somos', 
        loadComponent: () => import('./Core/Pages/quienesSomos/quienesSomos.component').then(m => m.QuienesSomosComponent) 
      },
      { path: 'modelo', component: ModeloComponent }, 

      // Rutas para 'cursos'
      {
        path: 'cursos',
        component: BuscadorComponent,
        data: { entityType: 'cursos' }
      },
      {
        path: 'cursos/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'cursos' }
      },

      // Rutas para 'articulos'
      {
        path: 'articulos',
        component: BuscadorComponent,
        data: { entityType: 'articulos' }
      },
      {
        path: 'articulos/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'articulos' }
      },

      // Rutas para 'proveedores'
      {
        path: 'proveedores',
        component: BuscadorComponent,
        data: { entityType: 'proveedores' }
      },
      {
        path: 'proveedores/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'proveedores' }
      },

      // Rutas para 'casos-exito'
      {
        path: 'casos-exito',
        component: BuscadorComponent,
        data: { entityType: 'casos-exito' }
      },
      {
        path: 'casos-exito/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'casos-exito' }
      },

      // Rutas para 'financiamiento-empleo'
      {
        path: 'financiamiento-empleo',
        component: BuscadorComponent,
        data: { entityType: 'financiamiento-empleo' }
      },
      {
        path: 'financiamiento-empleo/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'financiamiento-empleo' }
      },
    ],
  },

  // Ruta comodín: redirige cualquier ruta no definida al path por defecto
  { path: '**', redirectTo: '' },
];
