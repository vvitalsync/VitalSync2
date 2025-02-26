import { Component, OnInit } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
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
  edad: number | null = null;
  informacion: string = '';

  // Variables para mostrar errores
  cedulaError: string = '';
  correoError: string = '';
  nombreError: string = '';
  passwordError: string = '';
  edadError: string = '';

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) {}

  isPasswordValid(): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(this.password);
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.correo);
  }

  async register() {
    this.resetErrors(); // Reiniciar los errores antes de validar

    // Validaciones
    if (this.cedula.length !== 10 || !/^\d+$/.test(this.cedula)) {
      this.cedulaError = 'La cédula debe tener 10 dígitos numéricos.';
    }
    if (!this.isEmailValid()) {
      this.correoError = 'Ingrese un correo válido.';
    }
    if (this.nombre.trim().length === 0) {
      this.nombreError = 'El nombre es obligatorio.';
    }
    if (!this.isPasswordValid()) {
      this.passwordError =
        'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
    }
    if (this.edad === null || this.edad < 0 || this.edad > 110) {
      this.edadError = 'La edad debe estar entre 0 y 110.';
    }

    // Si hay errores, no continuar
    if (
      this.cedulaError ||
      this.correoError ||
      this.nombreError ||
      this.passwordError ||
      this.edadError
    ) {
      return;
    }

    try {
      // Verificar si la cédula ya existe en Firestore
      const userDocRef = doc(this.firestore, `usuario/${this.cedula}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        this.cedulaError = 'Esta cédula ya está registrada.';
        return;
      }

      // Registrar usuario en Firebase Authentication
      await this.authService.register(this.correo, this.password).toPromise();

      // Guardar en Firestore
      await setDoc(userDocRef, {
        correo: this.correo,
        nombre: this.nombre,
        password: this.password,
        dis: '',
        img: '',
        edad: this.edad,
        informacion: this.informacion || '',
      });

      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }

  resetErrors() {
    this.cedulaError = '';
    this.correoError = '';
    this.nombreError = '';
    this.passwordError = '';
    this.edadError = '';
  }

  ngOnInit() {}
}
