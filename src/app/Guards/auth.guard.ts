import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState().pipe(
      take(1), // Tomar solo el primer valor
      map((user) => {
        console.log('Usuario en AuthGuard:', user); // Para depuración
        if (user) {
          return true; // Usuario autenticado, permitir acceso
        } else {
          this.router.navigate(['/login']); // Redirigir al login
          return false;
        }
      }),
      catchError((err) => {
        console.error('Error en AuthGuard:', err);
        this.router.navigate(['/login']); // En caso de error, redirigir al login
        return [false];
      })
    );
  }
}
