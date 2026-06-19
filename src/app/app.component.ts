import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/fitness/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FitLife Studio - Portal Fitness';
  menuAbierto = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Obtiene si el usuario actual está autenticado
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  /**
   * Cierra la sesión activa y redirige al login
   */
  cerrarSesion(): void {
    this.authService.logout();
    this.cerrarMenu();
    this.router.navigate(['/fitness/login']);
  }
}
