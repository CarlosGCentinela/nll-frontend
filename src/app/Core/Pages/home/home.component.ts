// src/app/Core/Pages/home/home.component.ts

import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../../Services/sidebar.service.ts/sidebar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private sidebarService: SidebarService) {}

  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
