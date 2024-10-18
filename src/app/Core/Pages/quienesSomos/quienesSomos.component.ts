import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  templateUrl: './quienesSomos.component.html',
  styleUrls: ['./quienesSomos.component.scss']
})
export class QuienesSomosComponent {
  // Puedes agregar lógica del componente aquí si es necesario
}
