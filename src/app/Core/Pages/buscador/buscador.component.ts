import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleCardComponent } from '../../Components/article-card/article-card.component';

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
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    ArticleCardComponent
  ],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent implements OnInit {

  entityType: string = '';
  name: string = '';
  items: any[] = []; // Define el tipo según tus datos
  recomendaciones: any[] = []
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.name = data['name'] || '';
        this.getData()
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData(){
    this.recomendaciones = [
      { title: 'Recomendación 1', description: 'Descripción de la recomendación 1' },
      { title: 'Recomendación 2', description: 'Descripción de la recomendación 2' },
      { title: 'Recomendación 3', description: 'Descripción de la recomendación 3' }
    ];
  
    this.items = [
      { id: 1, description: 'Resultado de búsqueda 1' },
      { id: 2, description: 'Resultado de búsqueda 2' },
      { id: 3, description: 'Resultado de búsqueda 3' }
    ];
  }
}
