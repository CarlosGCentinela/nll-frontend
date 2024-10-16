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
  @Output() toggleSidebar = new EventEmitter<void>();
  isMenuOpen = false;
  
  // Variable para el menú desplegable
  isDropdownOpen = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
