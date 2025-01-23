import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Views/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Views/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./Views/inicio-component/inicio-component.component').then((m) => m.InicioComponentComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'ubicacion',
    loadComponent: () =>
      import('./Views/ubicacion-component/ubicacion-component.component').then((m) => m.UbicacionComponentComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./Views/historial-component/historial-component.component').then((m) => m.HistorialComponentComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
