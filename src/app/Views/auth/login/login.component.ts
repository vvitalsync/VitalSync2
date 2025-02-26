import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/user-service.service';
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
  recordarSesion: boolean = false; // Nuevo: Estado de "Recordar sesión"

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Verificar si hay una sesión guardada
    const cedulaGuardada = localStorage.getItem('usuarioCedula');
    if (cedulaGuardada) {
      this.userService.setUser(cedulaGuardada);
      this.router.navigate(['/inicio']);
    }
  }

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

      // Buscar el usuario en Firestore usando el correo
      const usuariosRef = collection(this.firestore, 'usuario');
      const q = query(usuariosRef, where('correo', '==', this.correo), where('password', '==', this.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const cedula = querySnapshot.docs[0].id; // La cédula es la clave en Firestore

        // Guardar la cédula en UserService
        this.userService.setUser(cedula);

        // Si el usuario marcó "Recordar sesión", guardar la cédula en localStorage
        if (this.recordarSesion) {
          localStorage.setItem('usuarioCedula', cedula);
        }

        alert('Inicio de sesión exitoso.');
        this.router.navigate(['/inicio']);
      } else {
        alert('Usuario no encontrado o contraseña incorrecta.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión. Intenta nuevamente.');
    }
  }
}
