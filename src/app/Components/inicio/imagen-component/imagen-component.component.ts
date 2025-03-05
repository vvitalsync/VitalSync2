import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserService } from '../../../Services/user-service.service';
import { NgIf } from '@angular/common';
@Component({
  standalone: true,
  imports: [IonicModule, NgIf],
  selector: 'app-imagen-component',
  templateUrl: './imagen-component.component.html',
  styleUrls: ['./imagen-component.component.scss'],
})
export class ImagenComponentComponent implements OnInit {
  imagenUrl: string | null = null;
  user: string | null = '';

  constructor(private firestore: Firestore, private userService: UserService) {}

  async ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user) {
      await this.cargarImagen();
    } else {
      console.error('Usuario no definido.');
    }
  }

  async cargarImagen() {
    try {
      const infoRef = doc(this.firestore, 'usuario/' + this.user);
      const docSnapshot = await getDoc(infoRef);
      if (docSnapshot.exists()) {
        this.imagenUrl = docSnapshot.data()['imagenUrl'] || null;
      } else {
        console.log('No se encontró la imagen en Firestore.');
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  }
}
