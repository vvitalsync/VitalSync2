import { Component, OnInit } from '@angular/core';
import { Database, set, ref } from '@angular/fire/database';
import { ToastController } from '@ionic/angular'; // Importación para Ionic Toasts
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../../Services/user-service.service'; // Importar el servicio
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  standalone: true,
  selector: 'app-boton-component',
  imports: [IonicModule],
  templateUrl: './boton-component.component.html',
  styleUrls: ['./boton-component.component.scss'],
})
export class BotonComponentComponent implements OnInit {
  user: string | null= '';
  dis: string | null ='';
  constructor(private db: Database,private firestore: Firestore, private toastController: ToastController,private userService: UserService,) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log('Usuario:', this.user);


    if (this.user) {
      // Obtener el valor de "dis" desde Firestore y luego suscribirse a Firebase
      this.obtenerCampoDis().then(() => {
        this.obtenerCampoDis();
      });
    } else {
      console.error('Usuario no definido.');
    }
  }

  async obtenerCampoDis(): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `usuario/${this.user}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        this.dis = userDocSnap.data()['dis'] ; // Asignar el valor de "dis"
        console.log('Campo "dis" obtenido de Firestore:', this.dis);
      } else {
        console.warn('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener el campo "dis" de Firestore:', error);
    }
  }
  // Función para enviar "false" a Firebase
  async sendFalseToDatabase(): Promise<void> {
    const path = '/Dispositivos/'+this.dis+'/estado'; // Ruta en la base de datos
    const dbRef = ref(this.db, path);
    console.log('Dispositivo'+ this.dis);
  
    try {
      await set(dbRef, true); // Escribir "false" en Firebase
    } catch (error) {
      this.presentToast('Error al enviar "false" a Firebase: ', true);
      console.error('Error al enviar "false":', error);
    }
  }

  // Mostrar un mensaje emergente con Ionic Toast
  async presentToast(message: string, isError = false): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: isError ? 'danger' : 'success',
    });
    await toast.present();
  }
}

