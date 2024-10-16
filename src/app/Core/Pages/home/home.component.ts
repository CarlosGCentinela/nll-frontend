import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Corregir 'styleUrl' a 'styleUrls' para evitar error
})
export class HomeComponent {
  isSidebarOpen = false; // Controla el estado del sidebar (abierto o cerrado)

  // Alternar el estado del sidebar entre abierto y cerrado
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Cerrar el sidebar si está abierto
  closeSidebar() {
    if (this.isSidebarOpen) {
      this.toggleSidebar(); // Reutilizar toggleSidebar para evitar duplicación
    }
  }
}
