// src/app/Core/Components/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../Services/sidebar.service.ts/sidebar.service'; // Asegúrate de que la ruta sea correcta
import { GeneralService } from '../../../Services/general.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  isDropdownOpen = false;
  isLoggedIn = false;

  constructor(
    private sidebarService: SidebarService,
    private generalService: GeneralService,
    private router: Router
  ) {
    // Suscribirse al estado de autenticación
    this.generalService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        this.isDropdownOpen = false; // Cerrar el dropdown al cerrar sesión
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.generalService.logout();
    this.router.navigate(['/login']); // Redirigir a la página de login después de cerrar sesión
    this.isDropdownOpen = false;
  }
}
