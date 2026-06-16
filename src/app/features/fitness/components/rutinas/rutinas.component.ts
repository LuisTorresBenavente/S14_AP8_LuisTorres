import { Component, OnInit } from '@angular/core';
import { FitnessService } from '../../services/fitness.service';
import { Rutina } from '../../interfaces/fitness.interface';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css'],
  standalone: false
})
export class RutinasComponent implements OnInit {
  rutinas: Rutina[] = [];
  rutinasFiltradas: Rutina[] = [];
  
  // Filtros
  filtroNivel: string = 'Todos';
  filtroCategoria: string = 'Todas';
  terminoBusqueda: string = '';
  
  // Vista Detalle
  rutinaSeleccionada: Rutina | null = null;
  cargando: boolean = true;

  constructor(private fitnessService: FitnessService) { }

  ngOnInit(): void {
    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.cargando = true;
    this.fitnessService.obtenerRutinas().subscribe({
      next: (data) => {
        this.rutinas = data;
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener rutinas:', err);
        this.cargando = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.rutinasFiltradas = this.rutinas.filter(rutina => {
      // Filtro de Texto (Nombre, descripción o equipamiento)
      const coincideBusqueda = !this.terminoBusqueda.trim() ||
        rutina.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        rutina.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        rutina.equipamiento.some(eq => eq.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));

      // Filtro de Nivel
      const coincideNivel = this.filtroNivel === 'Todos' || rutina.nivel === this.filtroNivel;

      // Filtro de Categoría
      const coincideCategoria = this.filtroCategoria === 'Todas' || rutina.categoria === this.filtroCategoria;

      return coincideBusqueda && coincideNivel && coincideCategoria;
    });
  }

  seleccionarRutina(rutina: Rutina): void {
    this.rutinaSeleccionada = rutina;
  }

  cerrarDetalle(): void {
    this.rutinaSeleccionada = null;
  }

  limpiarFiltros(): void {
    this.terminoBusqueda = '';
    this.filtroNivel = 'Todos';
    this.filtroCategoria = 'Todas';
    this.aplicarFiltros();
  }

  obtenerClaseNivel(nivel: string): string {
    switch(nivel) {
      case 'Principiante': return 'nivel-badge principiante';
      case 'Intermedio': return 'nivel-badge intermedio';
      case 'Avanzado': return 'nivel-badge avanzado';
      default: return 'nivel-badge';
    }
  }
}
