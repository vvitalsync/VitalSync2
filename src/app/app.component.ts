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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.authState().subscribe((user) => {
      this.isAuthenticated = !!user;

      // Redirigir al login si no está autenticado
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Método para manejar el cierre del modal
  onLoginDismiss() {
    console.log('El modal de inicio de sesión se cerró');
    this.isAuthenticated = true;
    // Aquí puedes implementar alguna lógica adicional si es necesario
  }
}
