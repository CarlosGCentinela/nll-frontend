export interface Slide {
  type: 'regular' | 'custom1' | 'custom2';
  imageUrl?: string;
  content?: string;
  
  // Nueva propiedad para la duración en milisegundos
  duration?: number;
}
