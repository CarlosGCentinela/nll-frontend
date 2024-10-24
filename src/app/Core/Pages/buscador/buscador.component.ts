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
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../Services/general.service';

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
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit, OnDestroy {

  enableRecomendacion = ['cursos', 'proveedores'];
  entityType: string = '';
  name: string = '';
  recomendaciones: any[] = [];
  private unsubscribe$ = new Subject<void>();

  searchTerm: string = '';
  allItems: any[] = []; // Todos los elementos obtenidos de la API
  items: any[] = [];    // Elementos filtrados para mostrar


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.name = data['name'] || '';
        this.getData2();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData(): void {
    const endpoint = this.entityType; // Por ejemplo, 'cursos', 'articulos', etc.
    this.generalService.getData(endpoint).subscribe(
      (data) => {
        this.allItems = data;
        this.filterItems();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
        // Datos de prueba en caso de error
        this.allItems = [
          { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
          { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
          // ...
        ];
        this.filterItems();
      }
    );
  }

  getData2(): void {
    this.allItems = [
      { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
      { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
      // ...
    ];

    this.recomendaciones=  this.allItems
    this.filterItems();
  }

  onSearch(): void {
    this.filterItems();
  }

  filterItems(): void {
    if (this.searchTerm.trim() === '') {
      this.items = this.allItems;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.items = this.allItems.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }
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
