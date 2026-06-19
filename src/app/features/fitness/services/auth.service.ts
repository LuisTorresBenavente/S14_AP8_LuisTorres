import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'fitlife_auth_token';
  private readonly USER_KEY = 'fitlife_auth_user';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  /**
   * Verifica si existe una sesión guardada en localStorage
   */
  private checkToken(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  /**
   * Intenta iniciar sesión con credenciales simuladas
   * Correo: admin@miapp.com
   * Contraseña: 123456
   */
  login(email: string, contrasena: string): boolean {
    if (email === 'admin@miapp.com' && contrasena === '123456') {
      localStorage.setItem(this.AUTH_KEY, 'simulated-jwt-token-xyz');
      localStorage.setItem(this.USER_KEY, email);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión activa
   */
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Obtiene el estado actual de autenticación síncronamente
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Obtiene el correo del usuario actual
   */
  getCurrentUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }
}
