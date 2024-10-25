// buscador.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleCardComponent } from '../../Components/article-card/article-card.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../Services/general.service';

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
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ArticleCardComponent,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit, OnDestroy {

  enableRecomendacion = ['cursos', 'proveedores'];
  entityType: string = '';
  name: string = '';
  recomendaciones: any[] = [];
  private unsubscribe$ = new Subject<void>();

  searchTerm: string = '';
  allItems: any[] = []; // Todos los elementos obtenidos de la API
  items: any[] = [];    // Elementos filtrados para mostrar


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.name = data['name'] || '';
        this.getData();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData(): void {
    const endpoint = this.entityType; // Por ejemplo, 'cursos', 'articulos', etc.
    this.generalService.getData(this.entityType).subscribe(
      (data) => {
        console.log(data)
        this.allItems = data;
        this.filterItems();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
        // Datos de prueba en caso de error
        this.allItems = [
          { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
          { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
          // ...
        ];
        this.filterItems();
      }
    );
  }

  onSearch(): void {
    this.filterItems();
  }

  filterItems(): void {
    if (this.searchTerm.trim() === '') {
      this.items = this.allItems;
      //this.items = this.allItems.slice(0, 3);
    } else {
      const term = this.searchTerm.toLowerCase();
      this.items = this.allItems.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }
  }

  /**
   * Genera un slug a partir del título.
   * @param id El ID del elemento.
   * @param title El título del elemento.
   * @returns La cadena combinada en formato "id-nombre-del-elemento".
   */
  getRouteParam(id: number, title: string): string {
    const titleSlug = title.toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, ''); // Elimina caracteres especiales
    return `${id}-${titleSlug}`;
  }

  //datos prueba
  getData2(): void {
    if(this.entityType === 'cursos'){
      const data= [
        {
          "idCurso": 11,
          "titulo": "Curso de Node.js Avanzado",
          "descripcion": "Aprende conceptos avanzados de Node.js y construye aplicaciones robustas.",
          "link": "https://example.com/cursos/nodejs-avanzado",
          "textos_claves": "nodejs, backend, express, prisma",
          "fecha_validacion": "2024-11-01T10:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": 1,
          "proveedor_id": 3,
          "duracion": "8 semanas",
          "pagado": true,
          "categoria_id": 2,
          "estado": "activo"
        },
        {
          "idCurso": 12,
          "titulo": "Automatización industrial",
          "descripcion": "El curso de automatización industrial ofrece una inmersión en tecnologías innovadoras y sistemas informáticos aplicados a la industria, enseñando sobre la Industria 4.0, sistemas ciber-físicos, y manufactura inteligente, preparando a los estudiantes para roles clave en la modernización industrial.",
          "link": "https://edutin.com/curso-de-automatizacion-industrial-4340",
          "textos_claves": "#AutomatizaciónIndustrial #Industria4.0 #InternetDeLasCosas #IoT #SistemasCiberFísicos #CloudComputing #CertificaciónInternacional #ProducciónIndustrial #LeanManufacturing #GestiónDeProyectos #TecnologíasDeLaInformación #InnovaciónTecnológica #FormaciónVirtual #SistemasEmbebidos #ManufacturaInteligente #EducaciónOnline",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "24 Horas",
          "pagado": false,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 13,
          "titulo": "IoT para la logistcia ",
          "descripcion": "El curso de IoT comienza con una base teórica sobre su significado y evolución, seguido de una inmersión en el diseño de sensores y redes. Profundiza en la integración de plataformas IoT con la gestión empresarial, enfocándose en aplicaciones prácticas en logística.",
          "link": "https://cel-logistica.org/curso/iot-para-la-logistica-online/",
          "textos_claves": "#IoT #Logística #Innovación #Tecnología #CursosOnline #Formación #ObservatorioIoT #GestiónLogística #TransformaciónDigital #ProyectosIoT #Ciberseguridad #EficienciaOperativa #NuevosModelosDeNegocio #SistemasDeInformación #DesarrolloSostenible #FormaciónContinua",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "8 Horas",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 14,
          "titulo": "E-commerce logistics and Last Mile\"",
          "descripcion": "El curso \"Logística de comercio electrónico y última milla\" de logycaX en edX explora la entrega eficiente de productos en el ámbito digital, enfocándose en la última etapa logística. Aprenderás sobre la operación logística desde el diseño hasta la entrega, los desafíos actuales en el comercio electrónico y casos de éxito globales, equipándote con estrategias innovadoras para mejorar la satisfacción del cliente y la eficiencia en la entrega.",
          "link": "https://www.edx.org/learn/ecommerce/logyca-e-commerce-logistics-and-last-mile",
          "textos_claves": "#Logística #ComercioElectrónico #ÚltimaMilla #SatisfacciónDelCliente #InscripcionesAbiertas #CursoOnline #edX #FormaciónEnLogística #TransporteDeProductos #EstrategiasLogísticas #CadenaDeSuministro #GestiónDeOperaciones #AprendizajeContinuo #LogísticaEficiente #EducaciónOnline #InnovaciónLogística",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": " 5 Semanas",
          "pagado": false,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 15,
          "titulo": "Curso CNC Láser CO2.",
          "descripcion": "El curso de STM University ofrece formación en el manejo y mantenimiento de equipos láser CNC CO2, cubriendo desde la instalación y calibración hasta el uso del software RD Works para corte y grabado, incluyendo mantenimiento básico y medidas de seguridad.",
          "link": "https://www.stmuniversity.com",
          "textos_claves": "#CNC #LáserCO2 #Certificación #Curso #AccesoALaCertificación #Mantenimiento #Seguridad #PanelDeControl #SoftwareRDWorks #CorteYGrabado #UsoDeAccesorios #Instalación #Unboxing #Educación #STMrobotics",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "No específica",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 16,
          "titulo": "Introducción a la Robótica e Industria 4.0",
          "descripcion": "El curso \"Introducción a la Robótica e Industria 4.0\" ofrece una visión completa de los fundamentos de la robótica y su aplicación en la era de la Industria 4.0. A lo largo de cinco módulos, aprenderás sobre la historia, conceptos básicos, programación de robots físicos y creación de bots para la recopilación y análisis de datos. Con instructores especializados y un enfoque práctico, este curso te prepara para comprender el impacto de la robótica en la industria moderna.",
          "link": "https://www.coursera.org/learn/introduccion-a-la-robotica-e-industria-4?action=enroll",
          "textos_claves": "#IntroducciónARobótica #Industria4.0 #CursoGratis #Inscríbete #Instructores #Módulos #NivelPrincipiante #Certificado #Evaluaciones #AprendeATuRitmo #Robots #Automatización #Programación #AnálisisDeDatos #Coursera #UniversidadesAnáhuac",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "7 Horas",
          "pagado": false,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 17,
          "titulo": "Ciberseguridad en la fabricación",
          "descripcion": "\nEl curso \"Ciberseguridad en la Fabricación\" de la University at Buffalo se enfoca en proteger tecnologías y datos en la fabricación digital. A lo largo de cuatro módulos, aprenderás a evaluar riesgos, implementar medidas de seguridad y responder a incidentes de seguridad. Este curso es parte del Programa especializado en Tecnología de Fabricación y Diseño Digital.",
          "link": "https://www.coursera.org/learn/cyber-security-manufacturing#outcomes",
          "textos_claves": "#Ciberseguridad #Manufactura #TecnologíaDeFabricación #DiseñoDigital #ShambhuUpadhyaya #InscríbeteGratis #Módulos #NivelPrincipiante #AyudaEconómica #Certificado #CourseraPlus #Flexibilidad #Evaluaciones #SeguridadDeLasOperaciones #InfraestructuraSegura #Industria4.0",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "21 Horas",
          "pagado": false,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 18,
          "titulo": "Mercados y seguridad industrial de IoT",
          "descripcion": "El curso \"Mercados y Seguridad Industrial de IoT\" se centra en el desarrollo del Internet Industrial de las Cosas (IIoT), explorando sus mercados emergentes, tendencias tecnológicas y habilidades clave necesarias. Cubre temas como Industria 4.0, plataformas de IIoT, aplicaciones en áreas como la fabricación y el petróleo, así como aspectos de seguridad informática y protocolos de comunicación.",
          "link": "https://www.coursera.org/learn/industrial-iot-markets-security",
          "textos_claves": "#IoT #Ciberseguridad #Industria4.0 #DesarrolloIIoT #DavidSluiter #InscríbeteGratis #Módulos #NivelIntermedio #AyudaEconómica #Certificado #CourseraPlus #Flexibilidad #Evaluaciones #SoftwareYServicios #SeguridadInformática #ProtocolosDeComunicación",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "21 Horas",
          "pagado": false,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 19,
          "titulo": "Foundations of IoT Systems and Industrial Automation",
          "descripcion": "\"Fundamentos de Sistemas de IoT y Automatización Industrial\" ofrece una inmersión completa en el mundo de los sistemas de IoT y su integración con la Automatización Industrial. Explora desde las raíces históricas hasta las aplicaciones prácticas, proporcionando una sólida comprensión de los conceptos fundamentales y las mejores prácticas en gestión de datos, seguridad y privacidad. Este curso es parte del programa especializado \"Sistemas de IoT y Aplicaciones Industriales con Pensamiento de Diseño\".",
          "link": "https://www.coursera.org/learn/iot-systems-and-industrial-automation-course-1",
          "textos_claves": "#IoT #SistemasIoT #AutomatizaciónIndustrial #PabloPuig #InscríbeteGratis #Módulos #NivelPrincipiante #AyudaEconómica #Certificado #CourseraPlus #DiseñoDeSistemas #GestiónDeDatos #SeguridadIoT #AprendizajeFlexible #ExperienciaRequerida #CursosOnline",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "13 Horas",
          "pagado": false,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 20,
          "titulo": "Inteligencia Artificial y RobóticaInteligencia Artificial y Robótica",
          "descripcion": "El curso \"Inteligencia Artificial y Robótica\" proporciona una formación completa en tecnologías clave como Machine Learning, procesamiento de Lenguaje Natural, Inteligencia Artificial y Robótica. A lo largo de tres cursos, los estudiantes aprenderán a diseñar modelos predictivos, construir bots, recolectar datos para análisis empresarial y mejorar los procesos productivos con robots.",
          "link": "https://www.edx.org/certificates/professional-certificate/anahuacx-inteligencia-artificial-y-robotica",
          "textos_claves": "#InteligenciaArtificial #Robótica #UniversidadesAnáhuac #CertificadoProfesional #MachineLearning #ProcesamientoDeLenguajeNatural #ModelosPredictivos #CursoAutodidacta #Descuento #HabilidadesTecnológicas #Innovación #ProgramaEspecializado #EduardoRodríguez #DavidAlbertoSansores #AprendizajeEnLínea #ImpactoIndustrial",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "3 Meses",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 21,
          "titulo": "Industria 4.0: fundamentos y alcances en el sistema eléctrico",
          "descripcion": "El curso \"Industria 4.0: fundamentos y alcances en el sistema eléctrico\" ofrecido por TecdeMonterreyX explora las nuevas tecnologías emergentes que lideran la Cuarta Revolución Industrial y sus impactos en el sector eléctrico. Durante el curso, los participantes estudiarán las arquitecturas propuestas que benefician tanto en términos operativos como económicos a las empresas y al sector eléctrico. ",
          "link": "https://www.edx.org/learn/electrical-engineering/tecnologico-de-monterrey-industria-4-0-fundamentos-y-alcances-en-el-sistema-electrico",
          "textos_claves": "#Industria4.0 #TecdeMonterreyX #SistemaEléctrico #CuartaRevoluciónIndustrial #NuevasTecnologías #ArquitecturasPropuestas #CursoEnLínea #AprendizajeEnLínea #TecnologíasEmergentes #edX #ImpactoEconómico #OperacionesEficientes #Certificación #DesarrolloProfesional #EducaciónContinua #TransformaciónDigital",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "4 Semanas",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 22,
          "titulo": "Fundamentos de la Construcción 4.0",
          "descripcion": "El curso \"Fundamentos de la Construcción 4.0\" explora las tecnologías y metodologías que están transformando la industria de la construcción. Los participantes adquieren habilidades para tomar decisiones informadas en proyectos constructivos utilizando nuevas tecnologías y métodos. Este programa ofrece una visión crítica sobre la adopción de una cultura digital en el contexto internacional de la construcción.",
          "link": "https://www.edx.org/certificates/professional-certificate/javerianax-fundamentos-de-la-construccion",
          "textos_claves": "#Construcción4.0 #PontificiaUniversidadJaveriana #CertificadoProfesional #TecnologíasAECO #MetodologíasDisruptivas #CursoAutodidacta #Descuento #Habilidades #TomaDeDecisiones #CulturaDigital #EvoluciónTecnológica #TransformaciónDigital #CarolinaValbuena #DanielSánchez #NataliaLozano #AprendizajeEnLínea",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "3 Meses",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 23,
          "titulo": "Programa Profesional en Logística 4.0. Fundamentos y Aplicaciones en Python",
          "descripcion": "El \"Programa Profesional en Logística 4.0. Fundamentos y Aplicaciones en Python\" proporciona una comprensión completa de la logística 4.0 y su impacto en diversas industrias. A través de dos cursos, los participantes aprenderán sobre tecnologías, mediciones de madurez organizacional, gestión del cambio y análisis de negocios con Python",
          "link": "https://www.edx.org/certificates/professional-certificate/javieranax-programa-profesional-en-logistica-40-fundamentos-y-aplicaciones-en-python",
          "textos_claves": "#Logística4.0 #PontificiaUniversidadJaveriana #CertificadoProfesional #Python #AnalíticaDeNegocios #TecnologíasLogísticas #TransformaciónDigital #GestiónDelCambio #ModeloDeMadurez #Ciencia #Tecnología #Innovación #CursoAutodidacta #Descuento #Instructores #Programación",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "2 Meses",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 24,
          "titulo": "OPC UA, MQTT, Microsoft Azure IoT e Industria 4.0",
          "descripcion": "Este curso ofrece una introducción completa a las tecnologías clave de la Industria 4.0, como OPC UA, MQTT y Microsoft Azure IoT. Aprenderás a conectar aplicaciones industriales, configurar servidores OPC, y enviar y analizar datos en la nube. Con instrucción teórica y práctica, dominarás la integración de dispositivos y la comunicación segura en entornos industriales avanzados.",
          "link": "https://www.udemy.com/course/opc-ua-mqtt-industria40/",
          "textos_claves": "#OPCUA #MQTT #MicrosoftAzureIoT #Industria4.0 #SiemensS7 #ModbusTCP #SQLServer #Datos #AnálisisOnline #CursoEnEspañol #Descuento #GarantíaDeReembolso #AccesoDePorVida #CalificaciónAlta #Estudiantes",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "8 Horas",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 25,
          "titulo": "Curso de Industria 4.0",
          "descripcion": "Este curso proporciona una introducción esencial a la Industria 4.0, abordando sus cambios disruptivos y nuevas oportunidades de negocio. Aprenderás sobre las tendencias tecnológicas clave y cómo la Industria 4.0 impactará en nuestras vidas y en el mundo empresarial, con casos de estudio que ilustran soluciones en este ámbito. Ideal para personas interesadas en entender y prepararse para esta revolución industrial.",
          "link": "https://www.udemy.com/course/industria_4_0/?couponCode=24T5FS31824",
          "textos_claves": "#Industria4.0 #NuevasOportunidades #Udemy #CursoEnEspañol #Estudiantes #CambiosTecnológicos #AnálisisDeCasos #RevoluciónIndustrial #TendenciasTecnológicas #CertificadoDeFinalización #Descuento #AccesoDePorVida #AprendizajeFlexible #CalificaciónAlta #ProfeSang\n\n\n\n",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "1 Horas 35 Minutos",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 26,
          "titulo": "Industria 4.0 y Nuevas Tendencias Tecnológicas",
          "descripcion": "El curso \"Industria 4.0 y Nuevas Tendencias Tecnológicas\" ofrece una comprensión práctica y completa de la transformación digital y la Industria 4.0, explorando tendencias como inteligencia artificial, vehículos autónomos, metaverso y más. Aprenderás a adaptarte al cambio tecnológico y a identificar oportunidades de negocios y desarrollo profesional en esta nueva era digital.",
          "link": "https://www.udemy.com/course/industria40ytecnologias/?couponCode=24T5FS31824",
          "textos_claves": "#Industria4.0 #NuevasTendencias #Udemy #TransformaciónDigital #Tecnologías #InteligenciaArtificial #VehículosAutónomos #BigData #InternetDeLasCosas #DesarrolloTecnológico #OportunidadesDeNegocio #CursoEnEspañol #Estudiantes #CertificadoDeFinalización #CalificaciónAlta",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "3 Horas 20 Minutos",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 27,
          "titulo": "¿Qué es la Industria 4.0?",
          "descripcion": "El curso \"Qué es la Industria 4.0\" ofrece una comprensión detallada de esta revolución tecnológica global, abordando su historia, características, impactos y desafíos. Explora las tecnologías clave como el IoT, la IA y la robótica, y analiza el papel crucial de los trabajadores y directivos en la implementación de estrategias efectivas. ",
          "link": "https://www.udemy.com/course/que-es-la-industria-40/?couponCode=24T5FS31824",
          "textos_claves": "#Industria4.0 #TransformaciónDigital #NuevasTecnologías #GustavoGuerrero #CursoEnEspañol #Estudiantes #Impactos #Retos #RolDeLasPersonas #Tecnología #CasoPráctico #Descuento #CertificadoDeFinalización #AprendizajeFlexible #CalificaciónAlta #GarantíaDeReembolso",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "2 Horas 8 Minutos",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 28,
          "titulo": "Cómo implementar las tecnologías de la Industria 4.0",
          "descripcion": "El curso \"Cómo implementar las tecnologías de la Industria 4.0\" ofrece una visión completa de la revolución tecnológica global, explorando su historia, características, impactos y desafíos. Aprenderás sobre las tecnologías clave como el IoT, la IA y la robótica, y comprenderás el papel de los trabajadores y directivos en la implementación efectiva de estrategias. Con actividades prácticas y recursos de apoyo, este curso te equipa con las herramientas necesarias para entender y aplicar las tecnologías de la Industria 4.0 en cualquier contexto empresarial.",
          "link": "https://www.futurelearn.com/courses/how-to-implement-industry-technologies",
          "textos_claves": "#Industria4.0 #I4.0 #SmartManufacturing #DigitalTransformation #RealTimeData #DataAnalysis #CPDCertification #SiemensMindSphere #DataAggregation #IntermediateLevel #OnlineLearning #FutureLearn #CourseAccreditation #TechnologyIntegration #BusinessProcessOptimization #Manufacturing",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "3 Semanas",
          "pagado": true,
          "categoria_id": 1,
          "estado": "Vigente"
        },
        {
          "idCurso": 29,
          "titulo": "Una introducción a la inteligencia artificial en la industria del turismo",
          "descripcion": "El curso \"Introducción a la inteligencia artificial en la industria del turismo\"+E19 ofrece una visión general de cómo la IA transformará el turismo, explorando casos de uso, tendencias y preocupaciones éticas. A través de dos semanas de estudio, aprenderás sobre aplicaciones prácticas de la IA en el sector turístico, sin necesidad de conocimientos técnicos previos.",
          "link": "https://www.futurelearn.com/courses/introduction-artificial-intelligence-tourism",
          "textos_claves": "#ArtificialIntelligence #TourismIndustry #Industry4.0 #MachineLearning #DigitalTransformation #EthicsInAI #UseCases #TourismManagement #OnlineLearning #LuleåUniversity #AIApplications #IntroductoryCourse #DataAnalysis #AIComponents #FutureOfTourism",
          "fecha_validacion": "2024-10-23T00:00:00.000Z",
          "modalidad": "Online",
          "empresa_id": null,
          "proveedor_id": null,
          "duracion": "2 Semanas",
          "pagado": true,
          "categoria_id": 9,
          "estado": "Vigente"
        },
        {
          "idCurso": 30,
          "titulo": "Intenet de las cosas industrial: Teoría y Aplicaciones",
          "descripcion": "El curso \"Internet de las Cosas Industrial: Teoría y Aplicaciones\" sumerge a los participantes en el mundo del IoT industrial, explorando casos de estudio y las últimas investigaciones. Los participantes adquieren habilidades para diseñar sistemas de sensores integrados, resolver problemas de ciencia de datos y desarrollar soluciones industriales innovadoras.",
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
          "titulo": "Fabricación Inteligente: Producción en la Industria 4.0",
          "descripcion": "El curso \"Fabricación Inteligente: Producción en la Industria 4.0\" es ofrecido por el Instituto de Tecnología de Massachusetts (MIT) en colaboración con Global Alumni. Impartido en línea en portugués durante 10 semanas, este programa presenta la convergencia entre la ciencia de datos y la inteligencia artificial para crear procesos eficientes en la fábrica del futuro. Los participantes aprenden a integrar software, sensores y sistemas para mejorar la productividad y obtener una ventaja competitiva.",
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
      ]
      this.allItems= data.map((item:any)=>{
        return {
          id: item.idCurso,
          title: item.titulo,
          description: item.descripcion,
          link: item.link,
          fecha: item.fecha,
          modalidad: item.modalidad,
          duracion: item.duracion,
          pagado: item.pagado,
          textos_claves: item.textos_claves
        }
      })
    }else{
      this.allItems = [
        { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
        { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
        // ...
      ];
    }

    this.recomendaciones=  this.allItems.slice(0, 3)
    this.filterItems();
  }

  listarTodo(){
    this.items = this.allItems;
  }
}
