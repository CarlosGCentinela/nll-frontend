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
import { TruncatePipe } from '../../Pipe/truncate.pipe';

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
    FormsModule,
    TruncatePipe
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

  private entityIdFields: { [key: string]: string } = {
    'articulos': 'Unnamed: 0',
    'financiamiento': 'Unnamed: 1',
    'proyectos': 'N°',
    'proveedores': 'idProveedor',
    'cursos': 'N°'
  };

  private entityTitleFields: { [key: string]: string } = {
    'articulos': 'Título',
    'financiamiento': 'Título',
    'proyectos': 'Tarea',
    'proveedores': 'nombreProveedor',
    'cursos': 'Nombre Curso'
  };

  private entityDescriptionFields: { [key: string]: string } = {
    'articulos': 'Resumen',
    'financiamiento': 'Descripción',
    'proyectos': 'Solución',
    'proveedores': 'ofrece',
    'cursos': 'Descripción'
  };

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
        this.getData();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData(): void {
    const endpoint = this.entityType;
    this.generalService.getData(endpoint).subscribe(
      data => {
        let datosLimpios:any[]= data;
        //parche para datos limpios
        if(this.entityType=='financiamiento'){
          datosLimpios = data.filter((item: any) => {
            return item?.ttulo && item?.descripcin;
          });
        }
        this.recomendaciones= this.obtenerRecomendaciones(datosLimpios)
        this.allItems = datosLimpios;
        this.filterItems();
      }
    );
  }

  onSearch(): void {
    this.filterItems();
  }

  filterItems(): void {
    const termNormalized = this.normalize(this.searchTerm?.trim() || '');

    if (!termNormalized) {
      this.items = this.allItems;
    } else {
      if (this.entityType === 'proveedores') {
        this.items = this.allItems.filter(item => {
          const ofrece = item.ofrece;
          if (!ofrece) {
            return false;
          }
          const termsList = ofrece.split(',').map((t:any) => this.normalize(t.trim()));
          return termsList.some((t:any) => t.includes(termNormalized));
        });
      } else {
        this.items = this.allItems.filter(item =>
          this.normalize(item.title || '').includes(termNormalized) ||
          this.normalize(item.description || '').includes(termNormalized)
        );
      }
    }
  }

  normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Genera un slug a partir del título.
   * @param id El ID del elemento.
   * @param title El título del elemento.
   * @returns La cadena combinada en formato "id-nombre-del-elemento".
   */
  getRouteParam(id: number, title: string): string {
    const titleSlug = title?.toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, ''); // Elimina caracteres especiales
    return `${id}-${titleSlug}`;
  }

  listarTodo(){
    this.items = this.allItems;
  }

  /**
   * paarche paara ser un backend
   * @param entityType 
   * @param item 
   * @returns 
   */
  private getField(entityType: string, item: any, fieldMap: { [key: string]: string }): string {
    if (!item) {
      return '';
    }

    const fieldName = fieldMap[entityType];

    if (!fieldName) {
      console.warn(`EntityType no reconocido: ${entityType}`);
      return '';
    }

    return item[fieldName] ?? '';
  }

  /**
   * paarche paara ser un backend
   * @param entityType 
   * @param item 
   * @returns 
   */
  getTitle(entityType: string, item: any): string {
    if (!item) {
      return '';
    }

    const titleFields: { [key: string]: string } = {
      'articulos': 'ttulo',
      'financiamiento': 'ttulo',
      'proyectos': 'tarea',
      'proveedores': 'nombreproveedor',
      'cursos': 'nombre_curso'
    };

    const titleField = titleFields[entityType];

    if (!titleField) {
      console.warn(`EntityType no reconocido: ${entityType}`);
      return '';
    }

    return item[titleField] ?? '';
  }

  /**
   * paarche paara ser un backend
   * @param entityType 
   * @param item 
   * @returns 
   */
  getDescription(entityType: string, item: any): string {
    if (!item) {
      return '';
    }

    const descriptionFields: { [key: string]: string } = {
      'articulos': 'resumen',
      'financiamiento': 'descripcin',
      'proyectos': 'solucion',
      'proveedores': 'ofrece',
      'cursos': 'descripcin'
    };

    if (entityType === 'proyectos') {
      const solucion = item['solucion'] ?? '';
      const resultado = item['resultado'] ?? '';
      return `${solucion}\n\nResultado:\n${resultado}`;
    }

    const descriptionField = descriptionFields[entityType];

    if (!descriptionField) {
      console.warn(`EntityType no reconocido: ${entityType}`);
      return '';
    }

    return item[descriptionField] ?? '';
  }

  getId(item: any): number {
    if (!item) {
      return 0;
    }

    const id = item['id'] ?? null;

    if (id === undefined || id === null) {
      console.warn('El campo "id" no existe en el item:', item);
      return 0;
    }

    return id;
  }

  /**
 * Obtiene de 1 a 3 recomendaciones de la lista proporcionada.
 * @param recomendaciones - Arreglo de recomendaciones.
 * @returns Arreglo con de 1 a 3 recomendaciones.
 */
obtenerRecomendaciones(recomendaciones: any[]): any[] {
  if (!Array.isArray(recomendaciones)) {
    console.warn('La variable recomendaciones no es un arreglo válido.');
    return [];
  }

  // Filtramos recomendaciones válidas si es necesario
  const recomendacionesValidas = recomendaciones.filter(item => item != null);

  // Número de recomendaciones a extraer (mínimo 1, máximo 3, no más que el total disponible)
  const numRecomendaciones = Math.min(3, recomendacionesValidas.length);

  // Si no hay recomendaciones disponibles, retornamos un arreglo vacío
  if (numRecomendaciones === 0) {
    console.warn('No hay recomendaciones disponibles.');
    return [];
  }

  // Mezclamos las recomendaciones para obtener una selección aleatoria
  const recomendacionesAleatorias = this.mezclarArray(recomendacionesValidas);

  // Extraemos las recomendaciones
  const recomendacionesSeleccionadas = recomendacionesAleatorias.slice(0, numRecomendaciones);

  return recomendacionesSeleccionadas;
}

/**
 * Mezcla aleatoriamente los elementos de un arreglo.
 * @param array - Arreglo a mezclar.
 * @returns Arreglo mezclado.
 */
mezclarArray(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

}
