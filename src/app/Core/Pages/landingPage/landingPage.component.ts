// src/app/landing-page/landing-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { Slide} from '../../Models/slide.model';
import { ArticleCardComponent } from '../../Components/article-card/article-card.component';
import { TruncatePipe } from '../../Pipe/truncate.pipe';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    ArticleCardComponent,
    TruncatePipe,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
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

  datosRelevantes= {
    cursos:[
      {
        "n": 27,
        "fecha_de_identificacin": 1710806400000,
        "entidad": "instituto de tecnología de massachusetts (mit)",
        "plataforma": "instituto de tecnología de massachusetts (mit)",
        "clasificacin_del_curso": "general",
        "nombre_curso": "transformación digital: tecnologías y sus aplicaciones prácticas",
        "idioma": "english | italian | french | portuguese | spanish",
        "costo": "2200 usd",
        "descripcin": "este curso aborda la implementación de cinco tecnologías líderes en la actualidad (blockchain, inteligencia artificial, internet de las cosas (iot), computación en la nube, ciberseguridad) en organizaciones, proporcionando estrategias, claves y conocimientos prácticos para transformar procesos y gestiones de manera eficiente.",
        "contenidos": "el curso cubre temas fundamentales de la tecnología moderna: blockchain, inteligencia artificial, internet de las cosas (iot), computación en la nube y ciberseguridad, proporcionando un conocimiento integral sobre cómo cada uno de estos componentes contribuye a la infraestructura digital avanzada.",
        "requisitos_y_evaluacin_del_curso": "para obtener la certificación, se requiere completar satisfactoriamente los cursos y evaluaciones asignadas durante el programa.",
        "texto_clave": "\"en el programa transformación digital: tecnologías y sus aplicaciones prácticas, de mit professional education, los participantes comprenderán cómo implementar en sus organizaciones las cinco tecnologías líderes en la actualidad: blockchain, inteligencia artificial, internet de las cosas (iot), cloud computing, ciberseguridad.\"",
        "rubro": "general",
        "unnamed_13": null,
        "tags": "#transformacióndigital #economíadigital #tecnologías #blockchain #inteligenciaartificial #internetdelascosas #iot #cloudcomputing #ciberseguridad #amenazasdeseguridad #estrategias #conocimientopráctico #gestiónempresarial #liderazgo #innovación #desarrolloprofesional #aprendizajeenlínea #colaboraciónglobal #mitprofessionaleducation #globalalumni",
        "modalidad": "online",
        "duracin": "8 semanas",
        "link": "https://professional.mit.edu/course-catalog/transformacion-digital-tecnologias-y-sus-aplicaciones-practicas-spanish",
        "revisin_curso": 1729641600000,
        "estado": "vigente",
        "id": 27
      },
      {
        "n": 28,
        "fecha_de_identificacin": 1710806400000,
        "entidad": "instituto de tecnología de massachusetts (mit)",
        "plataforma": "instituto de tecnología de massachusetts (mit)",
        "clasificacin_del_curso": "general",
        "nombre_curso": "certificado profesional en sostenibilidad",
        "idioma": "inglés/ español",
        "costo": "10300 usd",
        "descripcin": "el curso aborda la importancia de la sostenibilidad en la industria, identifica causas del deterioro ambiental y daños económicos y sociales, asimila información relacionada con la sostenibilidad, interpreta métricas y métodos de evaluación, descubre tecnologías clave de economía circular y formula políticas para implementar prácticas sostenibles.",
        "contenidos": "este curso enseña a identificar y mitigar el deterioro ambiental mediante soluciones sostenibles, interpretar métricas de sostenibilidad, y utilizar tecnologías de economía circular. también cubre el análisis de modelos económicos circulares, la formulación de políticas sostenibles y el cálculo de indicadores para controlar emisiones.",
        "requisitos_y_evaluacin_del_curso": "para obtener la certificación, se requiere completar satisfactoriamente los cursos y evaluaciones asignadas durante el programa.",
        "texto_clave": "\"la evolución hacia la globalización ha generado condiciones de fuerte competencia que obligan a las empresas y a las instituciones a actuar para dar respuesta a las oportunidades y amenazas en mercados cambiantes\"",
        "rubro": "general",
        "unnamed_13": null,
        "tags": "#certificadoprofesional #sostenibilidad #industriasostenible #prácticassostenibles #desarrollosostenible #globalización #competenciaempresarial #gestiónresponsable #estrategiassostenibles #futurosostenible #liderazgo #mitprofessionaleducation #optimización #impactosocial #cambioclimático #educaciónenlínea #colaboraciónglobal #globalalumni #innovaciónsostenible #economíacircular",
        "modalidad": "online",
        "duracin": "12 meses",
        "link": "https://professional.mit.edu/course-catalog/certificado-profesional-en-sostenibilidad-spanish",
        "revisin_curso": 1729641600000,
        "estado": "vigente",
        "id": 28
      },
      {
        "n": 29,
        "fecha_de_identificacin": 1710806400000,
        "entidad": "instituto de tecnología de massachusetts (mit)",
        "plataforma": "instituto de tecnología de massachusetts (mit)",
        "clasificacin_del_curso": "general",
        "nombre_curso": "gestión del desarrollo tecnológico: estrategias y análisis de portfolio",
        "idioma": "inglés/ español",
        "costo": "2200 usd",
        "descripcin": "curso diseñado para profundizar en la gestión estratégica de la tecnología, explorando la construcción y gestión de portfolios tecnológicos eficientes, así como el análisis del progreso tecnológico y su impacto futuro.",
        "contenidos": "este programa se centra en el análisis y evaluación de tecnologías, comenzando con una introducción al impacto tecnológico y su evaluación. se explora el efecto de la tecnología en aspectos sociales, organizacionales y fiscales, y se discute cómo establecer y gestionar organizaciones tecnológicas eficientes. también se abordan la identificación de diferentes tipos de tecnología y la relación entre tecnologías comerciales y militares. adicionalmente, el curso incluye un enfoque en la dinámica del modelado de sistemas y explora cómo aprovechar las posibilidades de las tecnologías futuras.",
        "requisitos_y_evaluacin_del_curso": "para obtener la certificación, se requiere completar satisfactoriamente los cursos y evaluaciones asignadas durante el programa.",
        "texto_clave": "\"programa de gestión del desarrollo tecnológico: estrategias y análisis de portfolio\"",
        "rubro": "general",
        "unnamed_13": null,
        "tags": "#gestióndeldesarrollotecnológico #estrategiastecnológicas #análisisdeportfolio #innovación #mitprofessionaleducation #planificaciónestratégica #portfoliotecnológico #desarrolloorganizacional #finanzas #tecnología #proyectosdeinnovación #educaciónenlínea #globalalumni #análisisdedatos #mejoracontinua #competitividad #liderazgo #transformacióndigital #crecimientosostenible #conocimientosavanzados #capacitaciónprofesional",
        "modalidad": "online",
        "duracin": "9 semanas",
        "link": "https://professional.mit.edu/course-catalog/gestion-del-desarrollo-tecnologico-estrategias-y-analisis-de-portfolio-spanish",
        "revisin_curso": 1729641600000,
        "estado": "vigente",
        "id": 29
      }
    ],
    financiamiento:[
      {
        "unnamed_0": "anid",
        "unnamed_1": 8,
        "ttulo": "fondecyt regular 2025.",
        "descripcin": "el objetivo de este concurso es promover la investigación de base científico-tecnológica en las diversas áreas del conocimiento",
        "link": "https://anid.cl/concursos/ ",
        "img_link": "https://anid.cl/concursos/ ",
        "categoras": ". financiamiento i+d+i en la región de los lagos",
        "id": 8
      },
      {
        "unnamed_0": "corfo",
        "unnamed_1": 9,
        "ttulo": " proyectos de exploración.",
        "descripcin": "tiene por objetivo contribuir al desarrollo y consolidación de la investigación científico-tecnológica disruptiva, novedosa, de alta incertidumbre y con un alto potencial transformador.",
        "link": "https://anid.cl/concursos/ ",
        "img_link": "https://anid.cl/concursos/ ",
        "categoras": ". financiamiento i+d+i en la región de los lagos",
        "id": 9
      },
      {
        "unnamed_0": "sercotec",
        "unnamed_1": 10,
        "ttulo": "kit digital ruta digital región de los lagos 2024.",
        "descripcin": "promueve la digitalización de micro y pequeñas empresas y cooperativas capacitadas previamente en los cursos de ruta digital, a través de la adquisición de herramientas tecnológicas que contribuyan a mejorar su gestión operativa y financiera, su proceso de comercialización de productos o servicios y el grado de innovación de su negocio.",
        "link": "https://www.sercotec.cl/region-de-los-lagos/ ",
        "img_link": "https://www.sercotec.cl/region-de-los-lagos/ ",
        "categoras": ". financiamiento i+d+i en la región de los lagos",
        "id": 10
      },
    ],
    articulos:[
      {
        "unnamed_0": 7,
        "ttulo": "colaboración entre grandes empresas y startups: una nueva forma\nde innovación abierta.",
        "resumen": "de la mano de la aceleración del cambio tecnológico, las grandes empresas se han visto\nforzadas a revisar sus estrategias de innovación, buscando ser más flexibles, incorporar\nnuevos conocimientos más rápido y no perder así ventaja frente a sus competidores. en\neste marco, la vinculación con startups aparece como un candidato natural para estas\nestrategias de innovación abierta corporativa. los resultados obtenidos en este artículo\nmuestran que se trata de un fenómeno muy reciente pero en expansión, aunque con\nuna fuerte concentración espacial en las economías más grandes de la región.",
        "link": "https://www.scielo.sa.cr/scielo.php?script=sci_arttext&pid=s1659-\n33592023000100070",
        "img": "https://www.scielo.sa.cr/scielo.php?script=sci_arttext&pid=s1659-\n33592023000100070",
        "fecha": null,
        "tag": "innovación abierta; emprendimiento corporativo; nuevas empresas;\nemprendimientos.",
        "id": 7
      },
      {
        "unnamed_0": 8,
        "ttulo": "alternativas de gestión artificial del trabajo en una industria\nmonopólica: el caso de la cementera el melón, chile.",
        "resumen": "la principal productora de cemento en chile, la sociedad fábrica de cemento de el\nmelón, se emplazó en la pequeña ciudad de la calera e intervino directamente en el\nespacio urbano con una serie de iniciativas destinadas a desmovilizar a los trabajadores\ny afianzar los lazos de lealtad de los mismos hacia la empresa. apoyada en una situación\neconómica expansiva, el melón desarrolló prácticas de control extensivo diseñando\nespacios físicos (poblaciones obreras) y un moderno servicio de bienestar, acercándose\na las prácticas del urbanismo paternalista, mediante el cual logró intervenir con éxito en\nlos ámbitos privados de los trabajadores y sus familias, fortaleciendo una identidad\nobrera ligada a la fábrica.",
        "link": "https://www.scielo.org.mx/pdf/alhe/v26n1/2007-3496-alhe-26-01-921.pdf",
        "img": "https://www.scielo.org.mx/pdf/alhe/v26n1/2007-3496-alhe-26-01-921.pdf",
        "fecha": null,
        "tag": "compañía manufcatura; bienestar, tecnología.",
        "id": 8
      },
      {
        "unnamed_0": 10,
        "ttulo": "el nivel de la inversión en tecnología de información no afecta el\nrendimiento empresarial: evidencia empírica de las industrias\nmanufactureras chilenas.",
        "resumen": "con el propósito general de evaluar el impacto de la tecnologías de información (ti) en\nel rendimiento industrial dentro del contexto de un país en desarrollo, y basado en una\nmuestra de 212 grandes empresas manufactureras chilenas, este estudio tiene por\nobjetivo medir la influencia de la inversión en ti sobre la eficiencia relativa de las\norganizaciones.",
        "link": "https://www.scielo.cl/pdf/jotmi/v6n4/art16.pdf",
        "img": "https://www.scielo.cl/pdf/jotmi/v6n4/art16.pdf",
        "fecha": null,
        "tag": "tecnologías de información; eficiencia; análisis envolvente de datos\n(aed); industria manufacturera.",
        "id": 10
      },
    ]
  }

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

  getDescription(entityType: string, item: any): string {
    if (!item) {
      return '';
    }

    const descriptionFields: { [key: string]: string } = {
      'articulos': 'resumen',
      'financiamiento': 'descripcin',
      'proyectos': 'solucion',
      'proveedores': 'ofrece',
      'cursos': 'descripcin'
    };

    if (entityType === 'proyectos') {
      const solucion = item['solucion'] ?? '';
      const resultado = item['resultado'] ?? '';
      return `${solucion}\n\nResultado:\n${resultado}`;
    }

    const descriptionField = descriptionFields[entityType];

    if (!descriptionField) {
      console.warn(`EntityType no reconocido: ${entityType}`);
      return '';
    }

    return item[descriptionField] ?? '';
  }

  getTitle(entityType:string,item: any): string {
    if (!item) return '';
    const titleFields: { [key: string]: string } = {
      'articulos': 'ttulo',
      'financiamiento': 'ttulo',
      'proyectos': 'tarea',
      'proveedores': 'nombreproveedor',
      'cursos': 'nombre_curso'
    };
    const titleField = titleFields[entityType];
    return item[titleField] ?? '';
  }

  getRouteParam(id: number, title: string): string {
    const titleSlug = title?.toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, ''); // Elimina caracteres especiales
    return `${id}-${titleSlug}`;
  }

  getIconName(entityType:string): string {
    const iconMap: { [key: string]: string } = {
      'quienes-somos': 'info',
      'modelo': 'assessment',
      'cursos': 'book',
      'proveedores': 'business',
      'proyectos': 'star',
      'financiamiento': 'attach_money',
      'articulos': 'article',
      'casos-exito': 'star', // Puedes ajustar este ícono si es necesario
      // Añade otros entityType y sus respectivos íconos
      'default': 'insert_photo'
    };
    return iconMap[entityType] || iconMap['default'];
  }


  openLink(): void {
    window.open('https://drive.google.com/file/d/12LpUYnh2Gje8wC3TMkESBJJSO3kJhXO2/view?usp=sharing', '_blank');
  }
}
