import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/user-service.service'; // Importar el servicio UserService
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, NgIf],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  correo: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private userService: UserService // Inyectar el UserService
  ) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async login() {
    if (!this.correo || !this.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      // Autenticar con Firebase Authentication
      await this.authService.login(this.correo, this.password).toPromise();

      // Verificar si el usuario existe en Firestore
      const userDocRef = doc(this.firestore, `usuario/${this.correo}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Establecer el correo del usuario en el servicio UserService
        alert('Inicio de sesión exitoso.');
        this.router.navigate(['/inicio']); // Redirigir al inicio
        this.userService.setUser(this.correo);
      } else {
        alert('Usuario no encontrado en la base de datos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión. Intenta nuevamente.');
    }
  }

  ngOnInit() {}
}
