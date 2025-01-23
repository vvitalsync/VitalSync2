import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { UserService } from '../../../Services/user-service.service';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-datos-component',
  templateUrl: './datos-component.component.html',
  styleUrls: ['./datos-component.component.scss'],
})
export class DatosComponentComponent implements OnInit {
  private firestore = inject(Firestore);

  user: string | null = null; // Cambiamos para obtener el usuario del servicio
  nombre: string | undefined = undefined;
  edad: number | undefined = undefined;
  informacion: string | undefined = '';

  constructor(private userService: UserService,private router: Router,) {}

  ngOnInit(): void {
    // Obtenemos el usuario del servicio
    this.user = this.userService.getUser();

    if (this.user) {
      this.obtenerDatosFirebase();
      console.warn('Usuario establecido'+this.user);
    } else {
      console.warn('No hay un usuario establecido en el servicio UserService.');
      this.router.navigate(['/login']);
    }
  }

  obtenerDatosFirebase() {
    if (!this.user) {
      console.warn('No se proporcionó un usuario.');
      return;
    }

    const datosDocRef = doc(this.firestore, 'usuario/' + this.user);

    onSnapshot(datosDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.informacion = data['informacion'];
        this.edad = data['edad'];
        this.nombre = data['nombre'];

        console.log('Texto:', this.informacion);
        console.log('Edad:', this.edad);
        console.log('Nombre:', this.nombre);
      } else {
        console.log('No se encontró el documento en Firestore');
      }
    });
  }
}
