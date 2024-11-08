// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../../../Services/general.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para el spinner

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private generalService: GeneralService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    // Usar el método de login simulado
    this.generalService.login({ correo:email, password })
      .subscribe({
        next: (response: any) => {
          const token = response.token;
          if (token) { 
            localStorage.setItem('authToken', token);
            
            //suscribirse a los nuvos observables
            this.generalService.nombreRol$.subscribe(nombreRol => {
              console.log('Nombre Rol:', nombreRol);
              // Realiza acciones basadas en el rol
              if (nombreRol === 'empresa') {
                this.router.navigate(['/empresa-dashboard']);
              } else {
                this.router.navigate(['/otro-dashboard']);
              }
            });

            this.generalService.encuestaRealizada$.subscribe(encuestaRealizada => {
              console.log('Encuesta Realizada:', encuestaRealizada);
              if (!encuestaRealizada) {
                this.router.navigate(['/realizar-encuesta']);
              }
            });

            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Token no recibido del servidor.';
          }
          this.isLoading = false;
        },
        error: (error: string) => {
          this.errorMessage = error;
          this.isLoading = false;
        }
      });
      //Guardar el rol->nombreRol / encuestaRealizada
  }
}
