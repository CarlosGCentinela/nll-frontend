// buscador-detalle.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from '../../../Services/general.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Articulo } from '../../Models/articulo.model';
import { CasoExito } from '../../Models/casoExito.model';
import { Curso } from '../../Models/curso.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-buscador-detalle',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './buscador-detalle.component.html',
  styleUrls: ['./buscador-detalle.component.scss']
})
export class BuscadorDetalleComponent implements OnInit, OnDestroy {
  entityType: string = '';
  idParam: string = '';
  entityName= '';
  itemId: number = 0;
  itemDetails: Articulo | CasoExito | Curso | any; // Puede ser cualquier tipo
  private unsubscribe$ = new Subject<void>();
  estado='' // notfound, ''

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
        this.loadDetail2();
      });
  }

  parseId(idParam: string): number {
    const idStr = idParam.split('-')[0];
    return parseInt(idStr, 10);
  }

  loadDetail(): void {
    if (this.entityType && this.itemId) {
      const endpoint = `${this.entityType}/${this.itemId}`;
      this.generalService.getData(endpoint).subscribe(
        data => {
          this.itemDetails = data;
        },
        error => {
          console.error('Error al obtener detalles:', error);
          // Datos de prueba
          if (this.entityType === 'articulos') {
            this.itemDetails = {
              idArticulo: this.itemId,
              titulo: 'Artículo de Prueba',
              resumen: 'Resumen del artículo de prueba.',
              fecha: '2023-10-01',
              imagen: 'https://example.com/imagen.jpg',
              link: 'https://example.com'
            } as Articulo;
          } else if (this.entityType === 'casos-exito') {
            this.itemDetails = {
              idCasoExito: this.itemId,
              titulo: 'Caso de Éxito de Prueba',
              resumen: 'Resumen del caso de éxito de prueba.',
              fecha: '2023-10-01',
              imagen: 'https://example.com/imagen.jpg',
              link: 'https://example.com'
            } as CasoExito;
          } else if (this.entityType === 'cursos') {
            this.itemDetails = {
              idCurso: this.itemId,
              titulo: 'Curso de Prueba',
              descripcion: 'Descripción del curso de prueba.',
              link: 'https://example.com',
              textos_claves: 'clave1, clave2',
              fecha_validacion: '2023-10-01',
              modalidad: 'Online',
              duracion: '20 horas',
              pagado: false
            } as Curso;
          }
          // Agregar lógica similar para 'proveedores' y 'financiamiento' si es necesario
        }
      );
    }
  }

  loadDetail2(): void {
    if (this.entityType && this.itemId) {
      // Datos de prueba
      if (this.entityType === 'articulos') {
        this.itemDetails = {
          idArticulo: this.itemId,
          titulo: 'Artículo de Prueba',
          resumen: 'Resumen del artículo de prueba.',
          fecha: '2023-10-01',
          imagen: 'https://example.com/imagen.jpg',
          link: 'https://example.com'
        } as Articulo;
      } else if (this.entityType === 'casos-exito') {
        this.itemDetails = {
          idCasoExito: this.itemId,
          titulo: 'Caso de Éxito de Prueba',
          resumen: 'Resumen del caso de éxito de prueba.',
          fecha: '2023-10-01',
          imagen: 'https://example.com/imagen.jpg',
          link: 'https://example.com'
        } as CasoExito;
      } else if (this.entityType === 'cursos') {
        this.itemDetails = {
          idCurso: this.itemId,
          titulo: 'Curso de Prueba',
          descripcion: 'Descripción del curso de prueba.',
          link: 'https://example.com',
          textos_claves: 'clave1, clave2',
          fecha_validacion: '2023-10-01',
          modalidad: 'Online',
          duracion: '20 horas',
          pagado: false
        } as Curso;    
      }
    }
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
}
