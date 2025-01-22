import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { UserService } from '../../../Services/user-service.service';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-datos-component',
  templateUrl: './datos-component.component.html',
  styleUrls: ['./datos-component.component.scss'],
})
export class DatosComponentComponent implements OnInit {
  private firestore = inject(Firestore);

  user: string = 'emilio123'; 
  nombre: string | undefined = undefined;
  edad: number | undefined = undefined;
  texto: number | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.setUser(this.user);
    this.obtenerDatosFirebase();
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
        this.texto = data['texto'];
        this.edad = data['edad'];
        this.nombre = data['nombre'];

        console.log('Text:', this.texto);
        console.log('Edad:', this.edad);
        console.log('Nombre:', this.nombre);

      } else {
        console.log('No se encontró el documento en Firestore');
      }
    });
  }
}
