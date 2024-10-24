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
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-inscripcion.jpg',
      content: `
        <h3>¡Impulsa tu Empresa con Industria 4.0!</h3>
        <p>Inscríbete y accede a herramientas tecnológicas avanzadas para transformar tu empresa.</p>
      `,
      duration: 5000 // 5 segundos
    },
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-industria.jpg',
      content: `
        <h3>Transforma tu Negocio</h3>
        <p>La Región de Los Lagos avanza hacia la Industria 4.0. No te quedes atrás y moderniza tus procesos.</p>
      `,
      duration: 7000 // 7 segundos
    },
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-conexion.jpg',
      content: `
        <h3>Conéctate con la Innovación</h3>
        <p>Accede a una red de proveedores y expertos en la Región de Los Lagos.</p>
      `,
      duration: 6000 // 6 segundos
    },
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-beneficios.jpg',
      content: `
        <h3>Beneficios para tu Empresa</h3>
        <p>Mejora la productividad, reduce costos y aumenta tu competitividad con la Industria 4.0.</p>
        
      `,
      duration: 5000 // 5 segundos
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
