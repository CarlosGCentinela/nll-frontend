// buscador.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleCardComponent } from '../../Components/article-card/article-card.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ArticleCardComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit, OnDestroy {

  enableRecomendacion = ['cursos', 'proveedores'];
  entityType: string = '';
  name: string = '';
  items: any[] = []; // Define el tipo según tus datos
  recomendaciones: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.name = data['name'] || '';
        this.getData();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData(){
    this.recomendaciones = [
      { id: 7, title: 'Recomendación 1', description: 'Descripción de la recomendación 1' },
      { id: 32, title: 'Recomendación 2', description: 'Descripción de la recomendación 2' },
      { id: 11, title: 'Recomendación 3', description: 'Descripción de la recomendación 3' }
    ];
  
    this.items = [
      { id: 3, title: 'Buscado 1', description: 'Resultado de búsqueda 1' },
      { id: 8, title: 'Buscado 2', description: 'Resultado de búsqueda 2' },
      { id: 1, title: 'Buscado 3', description: 'Resultado de búsqueda 3' }
    ];
  }

  /**
   * Genera un slug a partir del título.
   * @param id El ID del elemento.
   * @param title El título del elemento.
   * @returns La cadena combinada en formato "id-nombre-del-elemento".
   */
  getRouteParam(id: number, title: string): string {
    const titleSlug = title.toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, ''); // Elimina caracteres especiales
    return `${id}-${titleSlug}`;
  }
}
