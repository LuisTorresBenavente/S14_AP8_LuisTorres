import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Rutina, Plan, MensajeContacto, InscripcionPlan } from '../interfaces/fitness.interface';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  private readonly CONTACT_STORAGE_KEY = 'fitness_contact_messages';
  private readonly PLAN_INSCRIPTION_KEY = 'fitness_plan_inscriptions';

  // Datos mockeados de Rutinas
  private rutinas: Rutina[] = [
    {
      id: 'rutina_1',
      nombre: 'HIIT Quema Grasa Extremo',
      descripcion: 'Entrenamiento de alta intensidad diseñado para acelerar tu metabolismo, quemar calorías y mejorar tu resistencia cardiovascular en poco tiempo.',
      nivel: 'Intermedio',
      categoria: 'Cardio/HIIT',
      duracionMinutos: 25,
      caloriasEstimadas: 350,
      equipamiento: ['Cronómetro', 'Esterilla'],
      ejercicios: [
        { nombre: 'Jumping Jacks', repeticiones: '40 segundos', series: 4, descanso: '15s' },
        { nombre: 'Burpees', repeticiones: '30 segundos', series: 4, descanso: '15s' },
        { nombre: 'Sentadillas con salto', repeticiones: '40 segundos', series: 4, descanso: '15s' },
        { nombre: 'Escaladores (Mountain Climbers)', repeticiones: '40 segundos', series: 4, descanso: '15s' },
        { nombre: 'Plancha dinámica', repeticiones: '30 segundos', series: 4, descanso: '20s' }
      ]
    },
    {
      id: 'rutina_2',
      nombre: 'Fuerza Muscular y Tonificación',
      descripcion: 'Rutina completa de hipertrofia y acondicionamiento muscular enfocado en el desarrollo de fuerza y definición corporal general.',
      nivel: 'Avanzado',
      categoria: 'Fuerza',
      duracionMinutos: 50,
      caloriasEstimadas: 420,
      equipamiento: ['Mancuernas', 'Barra', 'Banco de ejercicios'],
      ejercicios: [
        { nombre: 'Press de Banca con mancuernas', repeticiones: '10-12 reps', series: 4, descanso: '60s' },
        { nombre: 'Sentadillas con peso (Cáliz/Goblet)', repeticiones: '12-15 reps', series: 4, descanso: '60s' },
        { nombre: 'Peso Muerto Rumano', repeticiones: '10 reps', series: 3, descanso: '90s' },
        { nombre: 'Remo con barra', repeticiones: '12 reps', series: 4, descanso: '60s' },
        { nombre: 'Press militar de hombros', repeticiones: '10 reps', series: 3, descanso: '60s' }
      ]
    },
    {
      id: 'rutina_3',
      nombre: 'Yoga para Flexibilidad y Relax',
      descripcion: 'Sesión enfocada en estiramientos profundos, control de la respiración y relajación mental. Ideal para días de descanso activo o recuperar tu cuerpo.',
      nivel: 'Principiante',
      categoria: 'Yoga/Flexibilidad',
      duracionMinutos: 30,
      caloriasEstimadas: 120,
      equipamiento: ['Esterilla de Yoga', 'Bloques de yoga (opcional)'],
      ejercicios: [
        { nombre: 'Saludo al Sol (Surya Namaskar)', repeticiones: '5 rondas', series: 1, descanso: 'Sin descanso' },
        { nombre: 'Postura del Guerrero I y II', repeticiones: '5 respiraciones por lado', series: 3, descanso: '10s' },
        { nombre: 'Postura del Perro Boca Abajo', repeticiones: '60 segundos', series: 2, descanso: '15s' },
        { nombre: 'Postura del Niño (Balasana)', repeticiones: '2 minutos', series: 1, descanso: 'Sin descanso' },
        { nombre: 'Savasana (Postura del cadáver)', repeticiones: '5 minutos', series: 1, descanso: 'Sin descanso' }
      ]
    },
    {
      id: 'rutina_4',
      nombre: 'CrossFit WOD Iniciación',
      descripcion: 'Entrenamiento del día (Workout of the Day) enfocado en movimientos funcionales de alta intensidad. Desafía tu fuerza mental y física.',
      nivel: 'Avanzado',
      categoria: 'CrossFit',
      duracionMinutos: 20,
      caloriasEstimadas: 400,
      equipamiento: ['Kettlebell', 'Caja de saltos', 'Cuerda de saltar'],
      ejercicios: [
        { nombre: 'Saltos dobles de cuerda', repeticiones: '50 reps', series: 4, descanso: '30s' },
        { nombre: 'Kettlebell Swings (Balanceo)', repeticiones: '20 reps', series: 4, descanso: '30s' },
        { nombre: 'Burpees sobre la caja', repeticiones: '15 reps', series: 4, descanso: '30s' },
        { nombre: 'Zancadas con peso corporal', repeticiones: '30 reps', series: 4, descanso: '30s' }
      ]
    }
  ];

  // Datos mockeados de Planes
  private planes: Plan[] = [
    {
      id: 'plan_basico',
      nombre: 'Plan Básico',
      precio: 19.99,
      duracion: 'Mes',
      caracteristicas: [
        'Acceso ilimitado a las salas de musculación',
        'Evaluación de condición física básica inicial',
        'Acceso a vestuarios y duchas',
        'Soporte técnico de la App móvil'
      ],
      popular: false,
      colorHex: '#64748b' // Slate
    },
    {
      id: 'plan_premium',
      nombre: 'Plan Premium Star',
      precio: 39.99,
      duracion: 'Mes',
      caracteristicas: [
        'Todos los beneficios del Plan Básico',
        'Acceso libre a clases grupales (Yoga, Spinning, HIIT)',
        'Rutina personalizada renovada mensualmente',
        '1 sesión de asesoramiento nutricional al mes',
        'Acceso prioritario a eventos y talleres especiales'
      ],
      popular: true,
      colorHex: '#10b981' // Green
    },
    {
      id: 'plan_elite',
      nombre: 'Plan Élite VIP',
      precio: 89.99,
      duracion: 'Mes',
      caracteristicas: [
        'Todos los beneficios del Plan Premium',
        'Entrenador personal asignado (2 sesiones semanales)',
        'Asesoramiento nutricional personalizado e ilimitado',
        'Acceso libre a zona de SPA y masajes terapéuticos',
        'Bebidas isotónicas y suplementación básica gratuitas en bar',
        'Toallas de cortesía y casillero privado VIP'
      ],
      popular: false,
      colorHex: '#f59e0b' // Gold
    }
  ];

  constructor() {}

  /**
   * Obtener todas las rutinas de fitness
   */
  obtenerRutinas(): Observable<Rutina[]> {
    return of(this.rutinas);
  }

  /**
   * Obtener una rutina específica por su ID
   */
  obtenerRutinaPorId(id: string): Rutina | null {
    return this.rutinas.find(r => r.id === id) || null;
  }

  /**
   * Obtener todos los planes de precios
   */
  obtenerPlanes(): Observable<Plan[]> {
    return of(this.planes);
  }

  /**
   * Obtener un plan específico por su ID
   */
  obtenerPlanPorId(id: string): Plan | null {
    return this.planes.find(p => p.id === id) || null;
  }

  /**
   * Guardar mensaje de contacto enviado por el usuario
   */
  guardarMensajeContacto(mensaje: MensajeContacto): Observable<boolean> {
    try {
      const mensajes = this.obtenerMensajesDeContacto();
      const nuevoMensaje = {
        ...mensaje,
        fechaEnvio: new Date().toISOString()
      };
      mensajes.push(nuevoMensaje);
      localStorage.setItem(this.CONTACT_STORAGE_KEY, JSON.stringify(mensajes));
      return of(true);
    } catch (e) {
      console.error('Error guardando mensaje en storage', e);
      return of(false);
    }
  }

  /**
   * Guardar inscripción a un plan de fitness
   */
  guardarInscripcionPlan(inscripcion: InscripcionPlan): Observable<boolean> {
    try {
      const inscripciones = this.obtenerInscripcionesPlanes();
      const nuevaInscripcion = {
        ...inscripcion,
        id: `inscrip_${Date.now()}`,
        fechaInscripcion: new Date().toISOString()
      };
      inscripciones.push(nuevaInscripcion);
      localStorage.setItem(this.PLAN_INSCRIPTION_KEY, JSON.stringify(inscripciones));
      return of(true);
    } catch (e) {
      console.error('Error guardando inscripción en storage', e);
      return of(false);
    }
  }

  // Métodos de lectura interna de Storage
  private obtenerMensajesDeContacto(): MensajeContacto[] {
    const data = localStorage.getItem(this.CONTACT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private obtenerInscripcionesPlanes(): InscripcionPlan[] {
    const data = localStorage.getItem(this.PLAN_INSCRIPTION_KEY);
    return data ? JSON.parse(data) : [];
  }
}
