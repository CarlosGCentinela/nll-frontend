import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../../Services/sidebar/sidebar.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen = false; // Controla el estado abierto/cerrado del sidebar
  private destroy$ = new Subject<void>(); // Utilizado para manejar la desuscripción

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Suscribirse al estado del sidebar y actualizar 'isOpen' cuando cambie
    this.sidebarService.sidebarOpen$
      .pipe(takeUntil(this.destroy$)) // Desuscribirse automáticamente cuando se destruya el componente
      .subscribe((isOpen) => {
        this.isOpen = isOpen;
      });
  }

  ngOnDestroy(): void {
    // Emitir para cerrar las suscripciones
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para cerrar el sidebar
  onClose(): void {
    this.sidebarService.closeSidebar();
  }
}
