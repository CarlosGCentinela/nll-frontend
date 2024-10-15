import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingPage.component.html',
  styleUrl: './landingPage.component.scss',
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
export class LandingPageComponent implements OnInit {
  
  images = [
    'https://picsum.photos/id/1018/1000/600',
    'https://picsum.photos/id/1015/1000/600',
    'https://picsum.photos/id/1019/1000/600'
  ];
  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resetCarouselTimer();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetCarouselTimer();
  }

  resetCarouselTimer() {
    this.stopCarousel();
    this.startCarousel();
  }

  
}