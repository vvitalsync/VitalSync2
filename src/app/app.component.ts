import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Views/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, NgIf, RouterLink, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'VitalSync';
  isSidebarOpen: boolean = false;
  isAuthenticated: boolean = false;
  isAuthPage: boolean = false; // Detecta si está en login o register

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.authState().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.checkAuthPage();

      // Si no está autenticado, redirigir al login
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });

    // Detectar cambios en la ruta
    this.router.events.subscribe(() => {
      this.checkAuthPage();
    });
  }

  private checkAuthPage() {
    const currentRoute = this.router.url;
    this.isAuthPage = currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
