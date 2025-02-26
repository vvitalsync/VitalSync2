import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Views/auth/login/login.component';
import { UserService } from '../app/Services/user-service.service';

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
  isAuthPage: boolean = false;
  user: string | null = null;
  private alertController = inject(AlertController); // Inyectamos el controlador de alertas

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.authService.authState().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.checkAuthPage();
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });

    this.router.events.subscribe(() => {
      this.checkAuthPage();
    });
  }

  private checkAuthPage() {
    const currentRoute = this.router.url;
    this.isAuthPage = currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Sí, cerrar sesión',
          handler: () => this.logout(), // Llama a logout si confirman
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
