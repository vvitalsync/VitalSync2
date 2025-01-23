import { Component, OnInit } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { NgIf } from '@angular/common';
@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  cedula: string = '';
  correo: string = '';
  nombre: string = '';
  password: string = '';
  edad: number = 0;
  informacion: string = '';

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) {}

  isPasswordValid(): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(this.password);
  }

  isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      this.cedula.length === 10 &&
      emailRegex.test(this.correo) &&
      this.nombre.trim().length > 0 &&
      this.isPasswordValid() &&
      this.edad >= 0 &&
      this.edad <= 110
    );
  }

  async register() {
    if (!this.isFormValid()) {
      alert('Por favor completa correctamente todos los campos.');
      return;
    }

    try {
      // Registrar el usuario en Firebase Authentication
      await this.authService.register(this.correo, this.password).toPromise();

      // Almacenar información adicional en Firestore
      const userDocRef = doc(this.firestore, `usuario/${this.correo}`);
      await setDoc(userDocRef, {
        cedula: this.cedula,
        correo: this.correo,
        nombre: this.nombre,
        password: this.password,
        dis: '',
        img: '',
        edad: this.edad,
        informacion: this.informacion || '',
      });

      alert('Registro exitoso.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al registrar. Intenta nuevamente.');
    }
  }

  ngOnInit() {}
}
