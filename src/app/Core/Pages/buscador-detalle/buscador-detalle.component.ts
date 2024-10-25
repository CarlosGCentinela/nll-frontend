import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from '../../../Services/general.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TruncatePipe } from '../../Pipe/truncate.pipe';

@Component({
  selector: 'app-buscador-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    TruncatePipe
  ],
  templateUrl: './buscador-detalle.component.html',
  styleUrls: ['./buscador-detalle.component.scss']
})
export class BuscadorDetalleComponent implements OnInit, OnDestroy {
  entityType: string = '';
  idParam: string = '';
  entityName = '';
  itemId: number = 0;
  itemDetails: any;
  allItems: any[] = [];
  private unsubscribe$ = new Subject<void>();
  estado = ''; // 'notfound' or ''

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.entityName = data['name'] || '';
      });

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.idParam = params.get('id') || '';
        this.itemId = this.parseId(this.idParam);
        this.loadDetail();
      });
  }

  parseId(idParam: string): number {
    const idStr = idParam.split('-')[0];
    return parseInt(idStr, 10);
  }

  loadDetail(): void {
    if (this.entityType && this.itemId) {
      const endpoint = `${this.entityType}`;
      this.generalService.getData(endpoint).subscribe(
        data => {
          // Normalizamos las claves de los items
          this.allItems = data.map(item => this.normalizeItemKeys(item));
          const item = this.allItems.find((item: any) => this.getId(item) === this.itemId);
          if (item) {
            this.itemDetails = item;
            console.log(item)
            this.estado = '';
          } else {
            this.estado = 'notfound';
          }
        },
        error => {
          console.error('Error al obtener detalles:', error);
          this.estado = 'notfound';
        }
      );
    }
  }

  normalizeFieldName(fieldName: string): string {
    return fieldName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .replace(/[^\w]/g, '');
  }

  normalizeItemKeys(item: any): any {
    const normalizedItem: any = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const normalizedKey = this.normalizeFieldName(key);
        normalizedItem[normalizedKey] = item[key];
      }
    }
    return normalizedItem;
  }

  getId(item: any): number | null {
    if (!item) {
      return null;
    }

    const idFieldMap: { [key: string]: string } = {
      'articulos': 'id',
      'financiamiento': 'id',
      'proyectos': 'id',
      'proveedores': 'id',
      'cursos': 'id'
    };

    const idField = idFieldMap[this.entityType];

    if (!idField) {
      return null;
    }

    const id = item[idField] || null;
    return id ? parseInt(id, 10) : null;
  }

  getTitle(item: any): string {
    if (!item) return '';
    const titleFields: { [key: string]: string } = {
      'articulos': 'ttulo',
      'financiamiento': 'ttulo',
      'proyectos': 'tarea',
      'proveedores': 'nombreproveedor',
      'cursos': 'nombre_curso'
    };
    const titleField = titleFields[this.entityType];
    return item[titleField] ?? '';
  }

  getImageUrl(item: any): string | null {
    if (!item) return null;
    const imageFields: { [key: string]: string } = {
      'articulos': 'img',
      'casos-exito': 'img',
      // Añade otros entityType si tienen imágenes
    };
    const imageField = imageFields[this.entityType];
    return item[imageField] ?? null;
  }

  getDate(item: any): Date | null {
    if (!item) return null;
    const dateFields: { [key: string]: string } = {
      'articulos': 'fecha',
      'financiamiento': 'fecha',
      'proyectos': 'fecha',
      'cursos': 'fecha_de_identificacion'
    };
    const dateField = dateFields[this.entityType];
    const dateStr = item[dateField] ?? null;
    return dateStr ? new Date(dateStr) : null;
  }

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openLink(): void {
    if (this.itemDetails?.link) {
      window.open(this.itemDetails.link, '_blank');
    }
  }

  getIconName(): string {
    const iconMap: { [key: string]: string } = {
      'quienes-somos': 'info',
      'modelo': 'assessment',
      'cursos': 'book',
      'proveedores': 'business',
      'proyectos': 'star',
      'financiamiento': 'attach_money',
      'articulos': 'article',
      'casos-exito': 'star', // Puedes ajustar este ícono si es necesario
      // Añade otros entityType y sus respectivos íconos
      'default': 'insert_photo'
    };
    return iconMap[this.entityType] || iconMap['default'];
  }
}
