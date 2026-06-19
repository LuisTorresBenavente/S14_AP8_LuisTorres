import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { validatorEmailValido, obtenerMensajeError } from '../../validators/fitness.validators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMensaje: string | null = null;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya está autenticado, redirigir a inicio automáticamente
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/fitness/inicio']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validatorEmailValido()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Obtiene el mensaje de error correspondiente del validador de fitness
   */
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    return obtenerMensajeError(controlName, control);
  }

  /**
   * Envía el formulario de inicio de sesión
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMensaje = null;

    const { email, password } = this.loginForm.value;

    // Pequeño retardo simulado para una UX fluida y premium
    setTimeout(() => {
      const exito = this.authService.login(email, password);
      this.cargando = false;

      if (exito) {
        this.router.navigate(['/fitness/inicio']);
      } else {
        this.errorMensaje = 'El correo electrónico o la contraseña son incorrectos.';
      }
    }, 600);
  }
}
