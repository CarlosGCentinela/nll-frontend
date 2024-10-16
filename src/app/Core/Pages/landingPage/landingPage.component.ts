import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss'], // Corregir 'styleUrl' a 'styleUrls'
  animations: [
    trigger('carouselAnimation', [
      transition('inactive => active', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition('active => inactive', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit, OnDestroy {
  
  images = [
    'https://picsum.photos/id/1018/1000/600',
    'https://picsum.photos/id/1015/1000/600',
    'https://picsum.photos/id/1019/1000/600'
  ];
  currentIndex = 0; // Índice de la imagen actual
  private intervalId: any; // ID del temporizador del carrusel

  // Iniciar el carrusel al cargar el componente
  ngOnInit() {
    this.startCarousel();
  }

  // Limpiar el temporizador al destruir el componente
  ngOnDestroy() {
    this.stopCarousel();
  }

  // Iniciar el temporizador del carrusel
  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide(); // Cambiar a la siguiente imagen
    }, 5000);
  }

  // Detener el temporizador del carrusel
  stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Cambiar a la siguiente imagen
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resetCarouselTimer();
  }

  // Cambiar a la imagen anterior
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetCarouselTimer();
  }

  // Reiniciar el temporizador del carrusel
  resetCarouselTimer() {
    this.stopCarousel(); // Detener el temporizador actual
    this.startCarousel(); // Iniciar un nuevo temporizador
  }
}
