import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent implements OnInit {

  entityType: string = '';
  items: any[] = []; // Define el tipo según tus datos
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.loadData();
      });
  }

  loadData(): void {
    switch(this.entityType) {
      case 'cursos':
        // Implementa la lógica para cargar cursos
        this.items = [/* datos de cursos */];
        break;
      case 'articulos':
        // Implementa la lógica para cargar artículos
        this.items = [/* datos de artículos */];
        break;
      case 'proveedores':
        // Implementa la lógica para cargar proveedores
        this.items = [/* datos de proveedores */];
        break;
      case 'casos-exito':
        // Implementa la lógica para cargar casos de éxito
        this.items = [/* datos de casos de éxito */];
        break;
      case 'financiamiento-empleo':
        // Implementa la lógica para cargar financiamiento-empleo
        this.items = [/* datos de financiamiento-empleo */];
        break;
      default:
        this.items = [];
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
