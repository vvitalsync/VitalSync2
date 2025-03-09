import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../../../Services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  selector: 'app-conf-component',
  templateUrl: './conf-component.component.html',
  styleUrls: ['./conf-component.component.scss'],
})
export class ConfComponentComponent implements OnInit {
  informacion: string = '';
  nombre: string = '';
  edad: number | null = null;
  dispositivo: string = '';
  user : string | null= '';
  constructor(private firestore: Firestore, private userService: UserService,private router: Router) {}

  async ngOnInit() {
    this.user = this.userService.getUser();
    console.log('Usuario:', this.user);

    if (this.user) {
      // Obtener el valor de "dis" desde Firestore y luego suscribirse a Firebase
      this.cargarDatos().then(() => {

      });
    } else {
      console.error('Usuario no definido.');
      this.router.navigate(['/login']);
    }
  }

  // Método para cargar los datos desde Firestore
  async cargarDatos() {
    try {
      const infoRef = doc(this.firestore, 'usuario/'+this.user);
      const docSnapshot = await getDoc(infoRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.informacion = data['informacion'] || '';
        this.nombre = data['nombre'] || '';
        this.edad = data['edad'] || null;
        this.dispositivo = data['dis'] || null;
      } else {
        console.log('No se encontraron datos en Firestore.');
      }
    } catch (error) {
      console.error('Error al cargar datos de Firestore:', error);
    }
  }


  // Método para guardar los cambios en Firestore
  async guardarCambios() {
    try {
      const infoRef = doc(this.firestore, 'usuario/' + this.user);
      const datosActualizados: any = {};
  
      if (this.informacion) datosActualizados.informacion = this.informacion;
      if (this.nombre) datosActualizados.nombre = this.nombre;
      if (this.edad !== null) datosActualizados.edad = this.edad;
      if (this.dispositivo) datosActualizados.dis = this.dispositivo;
  
      await updateDoc(infoRef, datosActualizados);
      console.log('Datos guardados exitosamente en Firestore:', datosActualizados);
      await this.cargarDatos();
        this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  }
  
}
