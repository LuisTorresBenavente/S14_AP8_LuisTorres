import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * VALIDADORES PERSONALIZADOS PARA EL MÓDULO DE FITNESS (CONTACTO Y PLANES)
 */

/**
 * Validador: El teléfono debe tener exactamente 9 dígitos numéricos
 */
export function validatorTelefono(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    // Remover caracteres no numéricos
    const soloNumeros = control.value.replace(/\D/g, '');
    return soloNumeros.length === 9 ? null : { telefonoInvalido: true };
  };
}

/**
 * Validador: Correo electrónico con formato correcto
 */
export function validatorEmailValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(control.value) ? null : { emailInvalido: true };
  };
}

/**
 * Validador: Nombre completo (debe tener al menos nombre y apellido, separados por espacio)
 */
export function validatorNombreCompleto(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const palabras = control.value.trim().split(/\s+/);
    return palabras.length >= 2 ? null : { nombreIncompleto: true };
  };
}

/**
 * Validador de grupo: Evita que el asunto y el cuerpo del mensaje sean idénticos
 */
export function validatorAsuntoMensajeDiferente(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const form = formGroup as FormGroup;
    const asunto = form.get('asunto')?.value;
    const mensaje = form.get('mensaje')?.value;

    if (asunto && mensaje && asunto.trim().toLowerCase() === mensaje.trim().toLowerCase()) {
      return { asuntoMensajeIguales: true };
    }
    return null;
  };
}

/**
 * Mensajes de error comunes en español para los formularios
 */
export const MENSAJES_ERROR = {
  required: 'Este campo es obligatorio.',
  minlength: 'Debe contener al menos {requiredLength} caracteres.',
  maxlength: 'No puede exceder los {requiredLength} caracteres.',
  telefonoInvalido: 'El teléfono debe contener exactamente 9 números (ej. 987654321).',
  emailInvalido: 'Por favor, introduce una dirección de correo válida.',
  nombreIncompleto: 'Por favor, introduce tu nombre y al menos un apellido.',
  asuntoMensajeIguales: 'El asunto y el mensaje no pueden ser idénticos.'
};

/**
 * Helper para obtener el mensaje de error correspondiente
 */
export function obtenerMensajeError(controlName: string, control: AbstractControl | null): string {
  if (!control || !control.errors) {
    return '';
  }

  const primerError = Object.keys(control.errors)[0];
  const errorObj = control.errors[primerError];

  if (primerError === 'minlength' && errorObj) {
    return MENSAJES_ERROR.minlength.replace('{requiredLength}', errorObj.requiredLength);
  }
  
  if (primerError === 'maxlength' && errorObj) {
    return MENSAJES_ERROR.maxlength.replace('{requiredLength}', errorObj.requiredLength);
  }

  return (MENSAJES_ERROR as any)[primerError] || 'Campo inválido.';
}
