// src/app/landing-page/landing-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { Slide} from '../../Models/slide.model';
import { ArticleCardComponent } from '../../Components/article-card/article-card.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, CarouselComponent, ArticleCardComponent],
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})
export class LandingPageComponent {

  mySlides: Slide[] = [
    {
      type: 'custom2',
      duration: 5000 // 5 segundos
    },
    {
      type: 'custom1',
      duration: 8000 // 8 segundos
    },
    {
      type: 'regular',
      content: '<h3>Slide 1</h3><p>Contenido del Slide 1</p>',
      duration: 3000 // 3 segundos
    },
    {
      type: 'regular',
      imageUrl: 'assets/img-fondo.png',
      content: '<h3>Slide 4</h3><p>Contenido del Slide 4</p>'
      // Sin duración específica, usará defaultDuration (5000 ms)
    }
  ];

  articles = [
    {
      title: 'Artículo 1',
      description: 'Esta es la descripción del artículo 1. Proporciona una visión general del contenido.'
    },
    {
      title: 'Artículo 2',
      description: 'Esta es la descripción del artículo 2. Ofrece detalles adicionales sobre el tema.'
    },
    {
      title: 'Artículo 3',
      description: 'Esta es la descripción del artículo 3. Contiene información relevante y útil.'
    }
  ];

}
