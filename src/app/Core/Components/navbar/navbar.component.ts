// src/app/Core/Components/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../Services/sidebar.service.ts/sidebar.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  isDropdownOpen = false;

  constructor(private sidebarService: SidebarService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
