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
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isSidebarOpen = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
