import { Routes } from '@angular/router';
import { LandingPageComponent } from './Core/Pages/landingPage/landingPage.component';
import { LoginComponent } from './Core/Pages/login/login.component';
import { RegistroComponent } from './Core/Pages/registro/registro.component';
import { HomeComponent } from './Core/Pages/home/home.component';
import { ModeloComponent } from './Core/Pages/modelo/modelo.component';
import { BuscadorComponent } from './Core/Pages/buscador/buscador.component';
import { BuscadorDetalleComponent } from './Core/Pages/buscador-detalle/buscador-detalle.component';
import { RegistroFormularioComponent } from './Core/Pages/registro-formulario/registro-formulario.component';
import { InformeComponent } from './Core/Pages/informe/informe.component';
import { PodcastsComponent } from './Core/Pages/podcasts/podcasts.component';

export const routes: Routes = [
  // Rutas que no incluyen el sidebar ni el navbar
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  //formulario de registro, usa el mismo componente
  { path: 'registro-persona',
    component: RegistroFormularioComponent,
    data: { entityType: 'Persona'}
  },
  { path: 'registro-empresa',
    component: RegistroFormularioComponent,
    data: { entityType: 'Empresa'}
  },
  { path: 'registro-proveedor',
    component: RegistroFormularioComponent,
    data: { entityType: 'Proveedor'}
  },


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
      { path: 'modelo/:rut', component: ModeloComponent },
      { path: 'informe', component: InformeComponent },
      { path: 'podcasts', component: PodcastsComponent },

      // Rutas para 'cursos'
      {
        path: 'cursos',
        component: BuscadorComponent,
        data: { entityType: 'cursos', name: 'Cursos' }
      },
      {
        path: 'cursos/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'cursos', name: 'Cursos' }
      },

      // Rutas para 'articulos'
      {
        path: 'articulos',
        component: BuscadorComponent,
        data: { entityType: 'articulos', name: 'Artículos de interés' }
      },
      {
        path: 'articulos/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'articulos', name: 'Artículos de interés' }
      },

      // Rutas para 'proveedores'
      {
        path: 'proveedores',
        component: BuscadorComponent,
        data: { entityType: 'proveedores', name: 'Proveedores' }
      },
      {
        path: 'proveedores/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'proveedores', name: 'Proveedores' }
      },

      // Rutas para 'casos-exito'
      {
        path: 'proyectos',
        component: BuscadorComponent,
        data: { entityType: 'proyectos', name: 'Proyectos destacados' }
      },
      {
        path: 'proyectos/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'proyectos', name: 'Proyectos destacados' }
      },

      // Rutas para 'financiamiento-empleo'
      {
        path: 'financiamiento',
        component: BuscadorComponent,
        data: { entityType: 'financiamiento', name: 'Financiamiento' }
      },
      {
        path: 'financiamiento/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'financiamiento', name: 'Financiamiento' }
      },
    ],
  },

  // Ruta comodín: redirige cualquier ruta no definida al path por defecto
  { path: '**', redirectTo: '' },
];
