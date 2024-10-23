import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-buscador-detalle',
  standalone: true,
  imports: [],
  templateUrl: './buscador-detalle.component.html',
  styleUrl: './buscador-detalle.component.scss'
})
export class BuscadorDetalleComponent implements OnInit, OnDestroy {

  entityType: string = '';
  id: string = '';
  itemDetails: any; // Define el tipo según tus datos
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.loadDetail();
      });

    // Obtener el ID desde los parámetros de la ruta
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.id = params.get('id') || '';
        this.loadDetail();
      });
      console.log(this.entityType,this.id)
    }

  loadDetail(): void {
    if (this.entityType && this.id) {
      switch(this.entityType) {
        case 'cursos':
          // Implementa la lógica para cargar detalle del curso con ID 'this.id'
          this.itemDetails = { /* datos del curso */ };
          break;
        case 'articulos':
          // Implementa la lógica para cargar detalle del artículo con ID 'this.id'
          this.itemDetails = { /* datos del artículo */ };
          break;
        case 'proveedores':
          // Implementa la lógica para cargar detalle del proveedor con ID 'this.id'
          this.itemDetails = { /* datos del proveedor */ };
          break;
        case 'casos-exito':
          // Implementa la lógica para cargar detalle del caso de éxito con ID 'this.id'
          this.itemDetails = { /* datos del caso de éxito */ };
          break;
        case 'financiamiento-empleo':
          // Implementa la lógica para cargar detalle de financiamiento-empleo con ID 'this.id'
          this.itemDetails = { /* datos de financiamiento-empleo */ };
          break;
        default:
          this.itemDetails = null;
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
