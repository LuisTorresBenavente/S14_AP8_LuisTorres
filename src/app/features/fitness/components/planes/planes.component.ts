import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitnessService } from '../../services/fitness.service';
import { Plan, InscripcionPlan } from '../../interfaces/fitness.interface';
import { validatorTelefono, validatorEmailValido, validatorNombreCompleto, obtenerMensajeError } from '../../validators/fitness.validators';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
  standalone: false
})
export class PlanesComponent implements OnInit {
  planes: Plan[] = [];
  cargando: boolean = true;
  
  // Selección de plan y modal
  planSeleccionado: Plan | null = null;
  mostrarModalInscripcion: boolean = false;
  inscripcionExitosa: boolean = false;
  
  // Formulario Reactivo
  inscripcionForm!: FormGroup;

  constructor(
    private fitnessService: FitnessService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarPlanes();
    this.inicializarFormulario();
  }

  cargarPlanes(): void {
    this.cargando = true;
    this.fitnessService.obtenerPlanes().subscribe({
      next: (data) => {
        this.planes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar planes:', err);
        this.cargando = false;
      }
    });
  }

  inicializarFormulario(): void {
    this.inscripcionForm = this.fb.group({
      planId: ['', Validators.required],
      planNombre: ['', Validators.required],
      nombreCliente: ['', [Validators.required, validatorNombreCompleto()]],
      emailCliente: ['', [Validators.required, validatorEmailValido()]],
      telefonoCliente: ['', [Validators.required, validatorTelefono()]],
      objetivoPrincipal: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    });
  }

  abrirInscripcion(plan: Plan): void {
    this.planSeleccionado = plan;
    this.inscripcionForm.patchValue({
      planId: plan.id,
      planNombre: plan.nombre
    });
    this.mostrarModalInscripcion = true;
    this.inscripcionExitosa = false;
  }

  cerrarModal(): void {
    this.mostrarModalInscripcion = false;
    this.planSeleccionado = null;
    this.inscripcionForm.reset({
      terminos: false
    });
  }

  enviarInscripcion(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
      return;
    }

    const datosInscripcion: InscripcionPlan = this.inscripcionForm.value;
    
    this.fitnessService.guardarInscripcionPlan(datosInscripcion).subscribe({
      next: (exito) => {
        if (exito) {
          this.inscripcionExitosa = true;
          setTimeout(() => {
            this.cerrarModal();
          }, 3000);
        }
      },
      error: (err) => {
        console.error('Error al procesar inscripción:', err);
      }
    });
  }

  // Helper para verificar errores en template
  campoInvalido(campo: string): boolean {
    const control = this.inscripcionForm.get(campo);
    return !!(control && control.errors && (control.dirty || control.touched));
  }

  // Helper para obtener el texto del error
  obtenerError(campo: string): string {
    const control = this.inscripcionForm.get(campo);
    return obtenerMensajeError(campo, control);
  }
}
