import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { Slide } from '../../Models/slide.model';
import { RouterLink } from '@angular/router';
import { GeneralService } from '../../../Services/general.service';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    CarouselComponent,
    RouterLink
  ],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.scss'
})
export class ModeloComponent implements OnInit {
  estado: string = ''; // completo - incompleto - ''
  rolUsuario = '';

  mySlides: Slide[] = [
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-inscripcion.jpg',
      content: `
        <h3>¡Impulsa tu Empresa con Industria 4.0!</h3>
        <p>Inscríbete y accede a herramientas tecnológicas avanzadas para transformar tu empresa.</p>
      `,
      duration: 5000
    },
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-industria.jpg',
      content: `
        <h3>Transforma tu Negocio</h3>
        <p>La Región de Los Lagos avanza hacia la Industria 4.0. No te quedes atrás y moderniza tus procesos.</p>
      `,
      duration: 7000
    },
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-conexion.jpg',
      content: `
        <h3>Conéctate con la Innovación</h3>
        <p>Accede a una red de proveedores y expertos en la Región de Los Lagos.</p>
      `,
      duration: 6000
    },
    {
      type: 'regular',
      imageUrl: 'assets/images/img-fondo-beneficios.jpg',
      content: `
        <h3>Beneficios para tu Empresa</h3>
        <p>Mejora la productividad, reduce costos y aumenta tu competitividad con la Industria 4.0.</p>
      `,
      duration: 5000
    }
  ];

  puntaje = {
    general: {
      letra: "A",
      subtitulo: "Evaluacion",
      descripcion: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was original"
    },
    categoria: [
      { letra: "A", categoria: "The Shiba", descripcion: "The Shiba Inu is the smallest of the six" },
      { letra: "A", categoria: "The Shiba", descripcion: "The Shiba Inu is the smallest of the six" },
      { letra: "B", categoria: "The Shiba", descripcion: "The Shiba Inu is the smallest of the six" },
      { letra: "A", categoria: "The Shiba", descripcion: "The Shiba Inu is the smallest of the six" },
      { letra: "A", categoria: "The Shiba", descripcion: "The Shiba Inu is the smallest of the six" }
    ]
  };

  constructor(private generalService: GeneralService) {
    this.setEstado();
  }

  ngOnInit(): void {
    // Suscribirse a los cambios de nombreRol
    this.generalService.nombreRol$.subscribe({
      next: (nombreRol) => {
        this.rolUsuario = nombreRol;
        this.setEstado();
      },
      error: (err) => {
        console.error('Error en la suscripción de nombreRol:', err);
        this.estado = '';
      }
    });

    // Suscribirse a los cambios de encuestaRealizada
    this.generalService.encuestaRealizada$.subscribe({
      next: (encuestaRealizada) => {
        this.setEstado();
      },
      error: (err) => {
        console.error('Error en la suscripción de encuestaRealizada:', err);
        this.estado = '';
      }
    });
  }

  private setEstado(): void {
    try {
      const nombreRol = localStorage.getItem('nombreRol') || '';
      const encuestaRealizadaStr = localStorage.getItem('encuestaRealizada') || 'false';
      const encuestaRealizada = encuestaRealizadaStr === 'true';

      // Determinar el estado basado en el rol y encuesta realizada
      this.estado = nombreRol === 'empresa' ? (encuestaRealizada ? 'completo' : 'incompleto') : '';
    } catch (error) {
      console.error('Error al obtener nombreRol o encuestaRealizada de localStorage:', error);
      this.estado = '';
    }
  }

  openLink(): void {
    try {
      const rut = localStorage.getItem('rut') || '';

      if (rut) {
        const url = `https://modelomadurez.nuevoloslagos.org/evaluar_madurez_tecnologica?rut=${rut}`;
        window.open(url, '_blank');
      } else {
        console.warn('RUT no encontrado en localStorage. Recargando la página actual.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al obtener RUT de localStorage:', error);
      window.location.href = '/404';
    }
  }
}
