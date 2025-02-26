import { Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Database, ref, onValue } from '@angular/fire/database';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserService } from '../../../Services/user-service.service';
import { IonicModule } from '@ionic/angular';
@Component({
  standalone: true,
  selector: 'app-boton2-component',
  imports: [IonicModule],
  templateUrl: './boton2-component.component.html',
  styleUrls: ['./boton2-component.component.scss'],
})
export class Boton2ComponentComponent implements OnInit {
  
  private database = inject(Database);
  private firestore = inject(Firestore);
  user: string | null = '';
  dis: string | null = '';
  lat: number | null = null;
  lng: number | null = null;

  constructor(private alertController: AlertController, private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user; // Asignar el usuario
      console.log('Usuario recibido:', this.user);

      if (this.user) {
        this.obtenerCampoDis().then(() => {
          this.obtenerUbicacionDesdeFirebase();
        });
      }
    });
  }

  async obtenerCampoDis(): Promise<void> {
    if (!this.user) {
      console.warn('Usuario no definido.');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, `usuario/${this.user}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        this.dis = userDocSnap.data()['dis'];
        console.log('Campo "dis" obtenido de Firestore:', this.dis);
      } else {
        console.warn('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener el campo "dis" de Firestore:', error);
    }
  }

  obtenerUbicacionDesdeFirebase(): void {
    if (!this.dis) {
      console.warn('Dispositivo no definido.');
      return;
    }

    const latRef = ref(this.database, `/Dispositivos/${this.dis}/ubi/lat`);
    const lngRef = ref(this.database, `/Dispositivos/${this.dis}/ubi/lng`);

    onValue(latRef, (snapshot) => {
      this.lat = snapshot.val();
      console.log('Latitud actualizada:', this.lat);
    });

    onValue(lngRef, (snapshot) => {
      this.lng = snapshot.val();
      console.log('Longitud actualizada:', this.lng);
    });
  }

  async confirmEmergencySMS() {
    const alert = await this.alertController.create({
      header: 'Confirmar Emergencia',
      message: '¿Estás seguro de que deseas enviar un mensaje de emergencia? ⚠️Este mensaje solo debe usarse en una situación real. Un uso indebido puede tener consecuencias legales.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Envío cancelado');
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            this.sendEmergencySMS();
          }
        }
      ]
    });

    await alert.present();
  }

  sendEmergencySMS() {
    const phoneNumber = '+593939015762'; // Reemplaza con el número de tu amigo

    if (this.lat !== null && this.lng !== null) {
      const message = encodeURIComponent(`VITALSYNC  ¡Emergencia! Persona desaparecida, ultima vez vista en: Ubicación: https://maps.google.com/?q=${this.lat},${this.lng}`);
      window.location.href = `sms:${phoneNumber}?body=${message}`;
    } else {
      console.error('No se pudo obtener la ubicación desde Firebase.');
    }
  }
}
