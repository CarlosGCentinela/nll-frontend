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
      "id": 30,
      "title": "Intenet de las cosas industrial: Teoría y Aplicaciones",
      "description": "El curso \"Internet de las Cosas Industrial: Teoría y Aplicaciones\" sumerge a los participantes en el mundo del IoT industrial, explorando casos de estudio y las últimas investigaciones. Los participantes adquieren habilidades para diseñar sistemas de sensores integrados, resolver problemas de ciencia de datos y desarrollar soluciones industriales innovadoras.",
      "link": "https://professional.mit.edu/course-catalog/internet-things-industrial-teoria-y-aplicaciones-spanish",
      "textos_claves": "\n#InternetOfThings #IoTIndustrial #MITProfessionalEducation #DigitalTransformation #ArtificialIntelligence #MachineLearning #Blockchain #TechnologyTrends #OnlineCourse #SensorTechnologies #DataCommunication #ProfessionalDevelopment #IoTApplications #TechnologyEducation #GlobalAlumni",
      "fecha_validacion": "2024-10-23T00:00:00.000Z",
      "modalidad": "Online",
      "empresa_id": null,
      "proveedor_id": null,
      "duracion": "9 Semanas",
      "pagado": true,
      "categoria_id": 1,
      "estado": "Vigente"
    },
    {
      "idCurso": 31,
      "title": "Fabricación Inteligente: Producción en la Industria 4.0",
      "description": "El curso \"Fabricación Inteligente: Producción en la Industria 4.0\" es ofrecido por el Instituto de Tecnología de Massachusetts (MIT) en colaboración con Global Alumni. Impartido en línea en portugués durante 10 semanas, este programa presenta la convergencia entre la ciencia de datos y la inteligencia artificial para crear procesos eficientes en la fábrica del futuro. Los participantes aprenden a integrar software, sensores y sistemas para mejorar la productividad y obtener una ventaja competitiva.",
      "link": "https://professional.mit.edu/course-catalog/manufatura-inteligente-producao-na-industria-40-portuguese",
      "textos_claves": "#ManufaturaInteligente #Indústria4.0 #MITProfessionalEducation #Tecnologia #AprendizadoDeMáquina #InternetDasCoisas #AnáliseDeDados #Eficiência #ProduçãoSustentável #Inovação #EducaçãoOnline #Competitividade #TransformaçãoIndustrial #Colaboração #DesenvolvimentoProfissional",
      "fecha_validacion": "2024-10-23T00:00:00.000Z",
      "modalidad": "Online",
      "empresa_id": null,
      "proveedor_id": null,
      "duracion": "10 Semanas",
      "pagado": true,
      "categoria_id": 1,
      "estado": "Vigente"
    }
  ];

}
