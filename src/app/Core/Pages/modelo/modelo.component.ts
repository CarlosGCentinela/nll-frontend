import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.scss'
})
export class ModeloComponent {
  puntaje = {
    general:{
      letra: "A",
      subtitulo: "Evaluacion",
      descripcion: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was original"
    },
    categoria: [
      {
        letra: "A",
        categoria: "The Shiba",
        descripcion: "The Shiba Inu is the smallest of the six"
      },
      {
        letra: "A",
        categoria: "The Shiba",
        descripcion: "The Shiba Inu is the smallest of the six"
      },
      {
        letra: "B",
        categoria: "The Shiba",
        descripcion: "The Shiba Inu is the smallest of the six"
      },
      {
        letra: "A",
        categoria: "The Shiba",
        descripcion: "The Shiba Inu is the smallest of the six"
      },
      {
        letra: "A",
        categoria: "The Shiba",
        descripcion: "The Shiba Inu is the smallest of the six"
      }
    ]
  }
}
