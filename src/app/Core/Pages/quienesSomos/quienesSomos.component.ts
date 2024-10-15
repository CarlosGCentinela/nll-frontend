import { Component } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  template: `
    <div class="quienes-somos">
      <h1>Quienes Somos</h1>
      <p>Aquí va la información sobre quiénes somos...</p>
    </div>
  `,
  styles: [`
    .quienes-somos {
      padding: 20px;
    }
  `]
})
export class QuienesSomosComponent {}