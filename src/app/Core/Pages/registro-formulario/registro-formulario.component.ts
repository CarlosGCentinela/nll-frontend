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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Question {
  label: string;
  name: string;
  type: string;
  validators: any[];
  options?: { value: number, label: string }[]; // Para preguntas con opciones (1 a 5)
}

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
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ArticleCardComponent,
    RouterLink, 
    RouterLinkActive,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './registro-formulario.component.html',
  styleUrls: ['./registro-formulario.component.scss']
})
export class RegistroFormularioComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  entityType: string = '';
  registroForm: FormGroup;
  isLoading = false;
  isPassMatch = false;

  // Propiedades para manejar la visibilidad de las contraseñas
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  // Propiedad para manejar el hover de las estrellas
  hoverRatings: { [key: string]: number } = {};

  // Definición de preguntas para cada tipo de entidad
  preguntas: { [key: string]: Question[] } = {
    Personal: [
      {
        label: 'Nombre',
        name: 'nombre',
        type: 'text',
        validators: [Validators.required]
      }
    ],
    Empresa: [
      {
        label: 'Nombre de la Empresa',
        name: 'nombreEmpresa',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT de la Empresa',
        name: 'rut',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      {
        label: 'Documento ERUT',
        name: 'eRut',
        type: 'file',
        validators: [Validators.required, this.fileValidator]
      },
      {
        label: 'Nombre del Representante',
        name: 'nombreRepresentante',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT del Representante',
        name: 'rutRepresentante',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      // Nuevas preguntas para empresas y proveedores
      {
        label: '¿Qué tan clara es la estrategia digital de tu organización?',
        name: 'estrategiaDigital',
        type: 'rating',
        validators: [Validators.required],
      },
      {
        label: '¿Qué tan complejos son los desafíos para implementar soluciones de la Industria 4.0 en tu organización?',
        name: 'desafiosIndustria4',
        type: 'rating',
        validators: [Validators.required],
      },
      {
        label: '¿Qué tan alta es la prioridad de la adopción de tecnologías digitales y la integración de la Industria 4.0 en tu organización?',
        name: 'prioridadAdopcion',
        type: 'rating',
        validators: [Validators.required],
      }
    ],
    Proveedor: [
      // Asumiendo que proveedores tienen las mismas preguntas que empresas
      {
        label: 'Nombre de la Empresa',
        name: 'nombreEmpresa',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT de la Empresa',
        name: 'rut',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      {
        label: 'Documento ERUT',
        name: 'eRut',
        type: 'file',
        validators: [Validators.required, this.fileValidator]
      },
      {
        label: 'Nombre del Representante',
        name: 'nombreRepresentante',
        type: 'text',
        validators: [Validators.required]
      },
      {
        label: 'RUT del Representante',
        name: 'rutRepresentante',
        type: 'text',
        validators: [Validators.required, this.rutValidator]
      },
      // Nuevas preguntas para empresas y proveedores
      {
        label: '¿Qué tan clara es la estrategia digital de tu organización?',
        name: 'estrategiaDigital',
        type: 'rating',
        validators: [Validators.required],
      },
      {
        label: '¿Qué tan complejos son los desafíos para implementar soluciones de la Industria 4.0 en tu organización?',
        name: 'desafiosIndustria4',
        type: 'rating',
        validators: [Validators.required],
      },
      {
        label: '¿Qué tan alta es la prioridad de la adopción de tecnologías digitales y la integración de la Industria 4.0 en tu organización?',
        name: 'prioridadAdopcion',
        type: 'rating',
        validators: [Validators.required],
      }
    ]
  };

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      tipoUsuario: [{ value: '', disabled: true }, Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      // Campos específicos
      nombreEmpresa: [''],
      rut: [''],
      eRut: [null],
      nombreRepresentante: [''],
      rutRepresentante: ['']
    }, { validators: this.passwordMatchValidator });
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
    // Primero, limpiar todas las preguntas adicionales
    this.clearAllDynamicFields();

    // Establecer los validadores y campos dinámicamente
    if (this.preguntas[this.entityType]) {
      this.preguntas[this.entityType].forEach(question => {
        if (!this.registroForm.contains(question.name)) {
          if (question.type === 'file') {
            // Inicializar el control con null para archivos
            this.registroForm.addControl(question.name, this.fb.control(null, question.validators));
          } else {
            this.registroForm.addControl(question.name, this.fb.control('', question.validators));
          }
        }
      });
    }

    // Actualizar el valor de tipoUsuario
    this.registroForm.patchValue({ tipoUsuario: this.entityType });
  }

  // Limpiar todos los campos dinámicos
  clearAllDynamicFields(): void {
    Object.keys(this.registroForm.controls).forEach(controlName => {
      if (!['tipoUsuario', 'correo', 'password', 'confirmPassword'].includes(controlName)) {
        this.registroForm.removeControl(controlName);
      }
    });
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

  // Validador personalizado para archivos (solo PDF y máximo 2MB)
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (!file) return null;

    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['application/pdf'];

    if (file.size > maxSize) {
      return { fileSize: true };
    }

    if (!allowedTypes.includes(file.type)) {
      return { fileType: true };
    }

    return null;
  }

  // Validador para confirmar contraseña
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const isValid = password === confirmPassword;
    return isValid ? null : { passwordsMismatch: true };
  }

  // Manejar la subida del archivo ERUT
  onFileChange(event: any, controlName: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.registroForm.patchValue({
        [controlName]: file
      });
      // Necesario para que Angular detecte el cambio
      this.registroForm.get(controlName)?.updateValueAndValidity();
    }
  }

  // Manejar la selección de valoración
  setRating(questionName: string, rating: number): void {
    this.registroForm.get(questionName)?.setValue(rating);
    this.registroForm.get(questionName)?.markAsTouched();
  }

  // Obtener la valoración actual para un campo específico
  getRating(questionName: string): number {
    return this.hoverRatings[questionName] || this.registroForm.get(questionName)?.value || 0;
  }

  // Manejar el hover de las estrellas
  hoverRating(questionName: string, rating: number): void {
    this.hoverRatings[questionName] = rating;
  }

  // Manejar el mouseleave de las estrellas
  leaveRating(questionName: string): void {
    this.hoverRatings[questionName] = this.registroForm.get(questionName)?.value || 0;
  }

  // Métodos para alternar la visibilidad de las contraseñas
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // Manejar el envío del formulario
  onSubmit(): void {
    console.log(this.registroForm, this.registroForm.hasError('passwordsMismatch'))
    this.isLoading = true;
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const formValue = this.registroForm.value;

    // Construir el objeto de usuario según el tipo
    const usuario = {
      tipoUsuario: this.entityType,
      correo: formValue.correo,
      password: formValue.password,
      ...this.getDynamicFields(formValue)
    };

    console.log('Datos de Registro:', usuario);
    console.log('Archivo ERUT:', formValue.eRut);

    // Aquí se enviaría el formulario al backend
    this.isLoading = false;
  }

  // Obtener campos dinámicos basados en el tipo de entidad
  getDynamicFields(formValue: any): any {
    const dynamicFields: any = {};
    if (this.preguntas[this.entityType]) {
      this.preguntas[this.entityType].forEach(question => {
        if (question.type !== 'file') {
          dynamicFields[question.name] = formValue[question.name];
        } else {
          dynamicFields[question.name] = formValue[question.name]; // Archivo
        }
      });
    }
    return dynamicFields;
  }

  // Resetear el formulario
  onReset(): void {
    this.registroForm.reset({ tipoUsuario: this.entityType });
    this.setupForm();
  }
}
