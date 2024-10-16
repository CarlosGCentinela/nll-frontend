import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Corregir 'styleUrl' a 'styleUrls'
})
export class SidebarComponent {
  @Input() isOpen = false; // Recibe el estado del sidebar (abierto/cerrado) del componente padre
  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el sidebar

  // Método para emitir el evento de cierre del sidebar
  onClose() {
    this.close.emit();
  }
}
