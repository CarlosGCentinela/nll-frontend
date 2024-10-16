import { Routes } from '@angular/router';
import { LandingPageComponent } from './Core/Pages/landingPage/landingPage.component';
import { LoginComponent } from './Core/Pages/login/login.component';
import { RegistroComponent } from './Core/Pages/registro/registro.component';
import { HomeComponent } from './Core/Pages/home/home.component';
import { CursoDetalleComponent } from './Core/Pages/curso-detalle/curso-detalle.component';
import { CursosComponent } from './Core/Pages/cursos/cursos.component';
import { ModeloComponent } from './Core/Pages/modelo/modelo.component';
import { ProveedoresComponent } from './Core/Pages/proveedores/proveedores.component';
import { ProveedorDetalleComponent } from './Core/Pages/proveedor-detalle/proveedor-detalle.component';
import { CasosExitoComponent } from './Core/Pages/casos-exito/casos-exito.component';
import { CasoExitoDetalleComponent } from './Core/Pages/caso-exito-detalle/caso-exito-detalle.component';
import { FinanciamientoEmpleoComponent } from './Core/Pages/financiamiento-empleo/financiamiento-empleo.component';
import { FinanciamientoEmpleoDetalleComponent } from './Core/Pages/financiamiento-empleo-detalle/financiamiento-empleo-detalle.component';
import { ArticulosComponent } from './Core/Pages/articulos/articulos.component';
import { ArticuloDetalleComponent } from './Core/Pages/articulo-detalle/articulo-detalle.component';

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
      { path: 'cursos', component: CursosComponent }, // Ruta para la lista de cursos
      { path: 'cursos/:id', component: CursoDetalleComponent }, // Ruta para el detalle de un curso
      { path: 'modelo', component: ModeloComponent }, 
      { path: 'proveedores', component: ProveedoresComponent }, 
      { path: 'proveedores/:id', component: ProveedorDetalleComponent },
      { path: 'casos-exito', component: CasosExitoComponent }, 
      { path: 'casos-exito/:id', component: CasoExitoDetalleComponent },
      { path: 'financiamiento-empleo', component: FinanciamientoEmpleoComponent }, 
      { path: 'financiamiento-empleo/:id', component: FinanciamientoEmpleoDetalleComponent },
      { path: 'articulos', component: ArticulosComponent }, 
      { path: 'articulos/:id', component: ArticuloDetalleComponent },
    ],
  },

  // Ruta comodín: redirige cualquier ruta no definida al path por defecto
  { path: '**', redirectTo: '' },
];
