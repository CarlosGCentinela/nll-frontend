import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>(); // Emite evento para alternar el sidebar
  isMenuOpen = false; // Estado del menú
  isDropdownOpen = false; // Estado del dropdown del menú

  // Emite el evento para alternar el sidebar
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  // Alternar el estado del menú principal
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Alternar el estado del menú desplegable
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
