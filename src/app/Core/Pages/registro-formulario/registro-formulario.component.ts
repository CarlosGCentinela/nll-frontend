import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleCardComponent } from '../../Components/article-card/article-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registro-formulario',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ArticleCardComponent,
    RouterLink, 
    RouterLinkActive,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './registro-formulario.component.html',
  styleUrl: './registro-formulario.component.scss'
})
export class RegistroFormularioComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  entityType: string = '';
  registroForm: FormGroup;
  isLoading = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    // Inicializar el formulario según los campos disponibles para usuarios y empresas
    this.registroForm = this.fb.group({
      tipoUsuario: [{ value: '', disabled: true }, Validators.required],
      nombre: [''],  // Campos de usuario
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      nombreEmpresa: [''], // Campos de empresa
      eRut: [''],
      rut: [''],
      nombreRepresentante: [''],
      rutRepresentante: ['']
    });
  }
  
  ngOnInit(): void {
    // Obtener el tipo de entidad desde los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'] || '';
        this.setupForm();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Configurar el formulario según el tipo de usuario o empresa
  setupForm(): void {
    if (this.entityType === 'usuario') {
      this.setUsuarioValidators();
      this.clearEmpresaValidators();
    } else if (this.entityType === 'empresa') {
      this.setEmpresaValidators();
      this.clearUsuarioValidators();
    }
  }

  // Asignar validadores específicos para usuarios
  setUsuarioValidators(): void {
    this.registroForm.get('nombre')?.setValidators([Validators.required]);
    this.registroForm.get('nombre')?.updateValueAndValidity();
  }

  // Asignar validadores específicos para empresas
  setEmpresaValidators(): void {
    this.registroForm.get('nombreEmpresa')?.setValidators([Validators.required]);
    this.registroForm.get('nombreEmpresa')?.updateValueAndValidity();

    this.registroForm.get('rut')?.setValidators([Validators.required, this.rutValidator]);
    this.registroForm.get('rut')?.updateValueAndValidity();

    this.registroForm.get('eRut')?.setValidators([Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:pdf))$/i)]);
    this.registroForm.get('eRut')?.updateValueAndValidity();

    this.registroForm.get('nombreRepresentante')?.setValidators([Validators.required]);
    this.registroForm.get('nombreRepresentante')?.updateValueAndValidity();

    this.registroForm.get('rutRepresentante')?.setValidators([Validators.required, this.rutValidator]);
    this.registroForm.get('rutRepresentante')?.updateValueAndValidity();
  }

  // Limpiar validadores de campos específicos de empresa
  clearEmpresaValidators(): void {
    this.registroForm.get('nombreEmpresa')?.clearValidators();
    this.registroForm.get('nombreEmpresa')?.updateValueAndValidity();

    this.registroForm.get('rut')?.clearValidators();
    this.registroForm.get('rut')?.updateValueAndValidity();

    this.registroForm.get('eRut')?.clearValidators();
    this.registroForm.get('eRut')?.updateValueAndValidity();

    this.registroForm.get('nombreRepresentante')?.clearValidators();
    this.registroForm.get('nombreRepresentante')?.updateValueAndValidity();

    this.registroForm.get('rutRepresentante')?.clearValidators();
    this.registroForm.get('rutRepresentante')?.updateValueAndValidity();
  }

  // Limpiar validadores de campos específicos de usuario
  clearUsuarioValidators(): void {
    this.registroForm.get('nombre')?.clearValidators();
    this.registroForm.get('nombre')?.updateValueAndValidity();
  }

  // Validador personalizado para la contraseña
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  // Validador personalizado para el RUT chileno
  rutValidator(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    if (!rut) return null;

    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    if (isNaN(Number(body))) return { rutInvalid: true };

    let sum = 0, multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += Number(body.charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const rest = sum % 11;
    const calculatedDV = rest === 1 ? 'K' : rest === 0 ? '0' : String(11 - rest);

    return calculatedDV !== dv ? { rutInvalid: true } : null;
  }

  // Manejar el envío del formulario
  onSubmit(): void {
    this.isLoading = true;
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const formValue = this.registroForm.value;
    const usuario = this.entityType === 'usuario' 
      ? { nombre: formValue.nombre, correo: formValue.correo, password: formValue.password, tipoUsuario: 'usuario' }
      : { nombreEmpresa: formValue.nombreEmpresa, correo: formValue.correo, password: formValue.password, eRut: formValue.eRut, rut: formValue.rut, nombreRepresentante: formValue.nombreRepresentante, rutRepresentante: formValue.rutRepresentante, tipoUsuario: 'empresa' };

    console.log('Datos de Registro:', usuario);

    // Aquí se enviaría el formulario al backend
    this.isLoading = false;
  }

  // Resetear el formulario
  onReset(): void {
    this.registroForm.reset({ tipoUsuario: this.entityType });
    this.setupForm();
  }
}
