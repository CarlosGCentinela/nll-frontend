export interface Curso {
  idCurso: number;
  titulo: string;
  descripcion?: string;
  link?: string;
  textos_claves?: string;
  fecha_validacion?: string;
  modalidad: string;
  duracion: string;
  pagado?: boolean;
}