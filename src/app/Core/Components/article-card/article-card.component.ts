// src/app/components/article-card/article-card.component.ts

import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-article-card',
  standalone: true, // Indica que es un componente standalone
  imports: [MatCardModule], // Importa módulos de Angular Material necesarios
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() title: string = 'Título del Artículo';
  @Input() description: string = 'Descripción del artículo...';
}
