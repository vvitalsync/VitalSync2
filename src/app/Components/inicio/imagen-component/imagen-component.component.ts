import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { UserService } from '../../../Services/user-service.service';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-imagen-component',
  templateUrl: './imagen-component.component.html',
  styleUrls: ['./imagen-component.component.scss'],
})
export class ImagenComponentComponent implements OnInit {
  private firestore = inject(Firestore);
  img: string | undefined = undefined;
  user: string ='emilio123'
  constructor(private userService: UserService,) {}

  ngOnInit(): void {
    this.obtenerDatosFirebase();
  }

  obtenerDatosFirebase() {
    // Referencia al documento en Firestore
    const datosDocRef = doc(this.firestore, 'usuario/'+this.user);

    // Suscribirse a los cambios en el documento
    onSnapshot(datosDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.img = data['img']; // Obtener el valor del campo 'pulso'
        console.log('Nombre:', this.img);
      } else {
        console.log('No se encontró el documento en Firestore');
      }
    });
  }
}

