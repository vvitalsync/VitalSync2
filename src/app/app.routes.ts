import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./Views/inicio-component/inicio-component.component').then(m => m.InicioComponentComponent),
        providers: [] // Puedes agregar providers específicos aquí si necesitas inyectar servicios adicionales.
    },
    {
        path: 'ubicacion',
        loadComponent: () => 
            import('./Views/ubicacion-component/ubicacion-component.component').then(m => m.UbicacionComponentComponent),
        providers: []
    },
    {
        path: 'historial',
        loadComponent: () => 
            import('./Views/historial-component/historial-component.component').then(m => m.HistorialComponentComponent),
        providers: []
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }
];
