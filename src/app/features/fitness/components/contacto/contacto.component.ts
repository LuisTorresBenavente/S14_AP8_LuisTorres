import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitnessService } from '../../services/fitness.service';
import { MensajeContacto } from '../../interfaces/fitness.interface';
import { validatorTelefono, validatorEmailValido, validatorAsuntoMensajeDiferente, obtenerMensajeError } from '../../validators/fitness.validators';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  standalone: false
})
export class ContactoComponent implements OnInit {
  contactoForm!: FormGroup;
  envioExitoso: boolean = false;
  guardando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private fitnessService: FitnessService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, validatorEmailValido()]],
      telefono: ['', [Validators.required, validatorTelefono()]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      validators: validatorAsuntoMensajeDiferente()
    });
  }

  enviarContacto(): void {
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const datosContacto: MensajeContacto = this.contactoForm.value;

    this.fitnessService.guardarMensajeContacto(datosContacto).subscribe({
      next: (exito) => {
        this.guardando = false;
        if (exito) {
          this.envioExitoso = true;
          this.contactoForm.reset();
          
          // Ocultar mensaje de éxito después de unos segundos
          setTimeout(() => {
            this.envioExitoso = false;
          }, 5000);
        }
      },
      error: (err) => {
        this.guardando = false;
        console.error('Error al guardar mensaje de contacto:', err);
      }
    });
  }

  // Helper para verificar errores en template
  campoInvalido(campo: string): boolean {
    const control = this.contactoForm.get(campo);
    return !!(control && control.errors && (control.dirty || control.touched));
  }

  // Helper para obtener el texto del error
  obtenerError(campo: string): string {
    const control = this.contactoForm.get(campo);
    return obtenerMensajeError(campo, control);
  }

  // Helper para verificar error de grupo
  formularioTieneError(errorKey: string): boolean {
    return this.contactoForm.hasError(errorKey) && (this.contactoForm.touched || this.contactoForm.dirty);
  }
}
