import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../../Services/sidebar.service.ts/sidebar.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from '../../../Services/general.service';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService } from '../../../Services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatDividerModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
//copiar el OnInit en modelo
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen = false; // Controla el estado abierto/cerrado del sidebar
  isLoggedIn = false; // controla el estado de la  autenticacion
  menuOptions: any[] = [];
  menuNavbar = [
    { label: 'Quienes somos', icon: 'info', routerLink: '/quienes-somos' },
    { label: 'Modelo de diagnóstico', icon: 'assessment', routerLink: '/modelo' },
    { label: 'Cursos', icon: 'book', routerLink: '/cursos' },
    { label: 'Proveedores', icon: 'business', routerLink: '/proveedores' },
    { label: 'Proyectos destacados', icon: 'star', routerLink: '/proyectos' },
    { label: 'Financiamiento', icon: 'attach_money', routerLink: '/financiamiento' },
    { label: 'Artículos de interés', icon: 'article', routerLink: '/articulos' }
  ];
  menuBotton = [
    { label: 'Cerrar Sesión', icon: 'logout', action: 'logout' },
  ]

  private destroy$ = new Subject<void>(); // Utilizado para manejar la desuscripción
  
  constructor(
    private sidebarService: SidebarService,
    private generalService: GeneralService,
    private router: Router,
    protected themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado del sidebar y actualizar 'isOpen' cuando cambie
    this.sidebarService.sidebarOpen$
      .pipe(takeUntil(this.destroy$)) // Desuscribirse automáticamente cuando se destruya el componente
      .subscribe((isOpen) => {
        this.isOpen = isOpen;
      });
    
    // Suscribirse al estado de autenticacion
    this.generalService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
        this.updateMenuOptions();
      });
  }

  ngOnDestroy(): void {
    // Emitir para cerrar las suscripciones
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateMenuOptions() {
    if (this.isLoggedIn) {
      this.menuOptions = [
        { label: 'Mi Perfil', icon: 'person', routerLink: '/mi-perfil' }
      ];
    } else {
      this.menuOptions = [
        { label: 'Ingresar', icon: 'login', routerLink: '/login' },
        { label: 'Registrar', icon: 'person_add', routerLink: '/registro' },
      ];
    }
  }

  // Método para cerrar el sidebar
  onClose(): void {
    this.sidebarService.closeSidebar();
  }
  
  handleMenuClick(option: any): void {
    if (option.action === 'logout') {
      this.generalService.logout();
      this.router.navigate(['/']); // Redirigir a login después de cerrar sesión
    } else if (option.routerLink) {
      this.router.navigate([option.routerLink]);
    }
    this.onClose();
  }

  toggleTheme() {
    const newTheme =
      this.themeService.getTheme() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeService.setTheme(newTheme);
  }

  get themeIcon(): string {
    return this.themeService.getTheme() === 'light-theme' ? 'dark_mode' : 'light_mode';
  }

  get themeLabel(): string {
    return this.themeService.getTheme() === 'light-theme' ? 'Modo oscuro' : 'Modo claro';
  }
}
