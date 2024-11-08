import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink,MatButtonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

}