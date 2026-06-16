export interface Ejercicio {
  nombre: string;
  repeticiones: string;
  series: number;
  descanso: string; // e.g. "60s"
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion: string;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  categoria: 'Fuerza' | 'Cardio/HIIT' | 'Yoga/Flexibilidad' | 'CrossFit';
  duracionMinutos: number;
  caloriasEstimadas: number;
  ejercicios: Ejercicio[];
  equipamiento: string[];
  imagen?: string;
}

export interface Plan {
  id: string;
  nombre: string;
  precio: number;
  duracion: string; // e.g. "Mes", "Año"
  caracteristicas: string[];
  popular: boolean;
  colorHex: string;
}

export interface MensajeContacto {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  fechaEnvio?: string;
}

export interface InscripcionPlan {
  id?: string;
  planId: string;
  planNombre: string;
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  objetivoPrincipal: string; // e.g. "Perder peso", "Ganar masa muscular", "Resistencia", "Salud general"
  fechaInscripcion?: string;
}
