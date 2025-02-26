import { Component, OnInit } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { DatosComponentComponent } from '../../inicio/datos-component/datos-component.component';
import { UserService } from '../../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-signosv-component',
  imports: [IonicModule, DatosComponentComponent],
  templateUrl: './signosv-component.component.html',
  styleUrls: ['./signosv-component.component.scss'],
})
export class SignosvComponentComponent implements OnInit {
  pulso: number | undefined = undefined;
  saturacion: number | undefined = undefined; // Agregamos la saturación
  dis: string | null = ''; 
  user: string | null = null;

  constructor(
    private router: Router,
    private database: Database,
    private userService: UserService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log('Usuario:', this.user);
    
    this.solicitarPermisoNotificaciones();

    if (this.user) {
      this.obtenerCampoDis().then(() => {
        this.obtenerDatosFirebase();
      });
    } else {
      console.error('Usuario no definido.');
      this.router.navigate(['/login']);
    }
  }

  async obtenerCampoDis(): Promise<void> {
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

  obtenerDatosFirebase(): void {
    const pulsoRef = ref(this.database, `/Dispositivos/${this.dis}/sensor/pulso`);
    const satRef = ref(this.database, `/Dispositivos/${this.dis}/sensor/sat_oxi`); // Referencia a la saturación

    onValue(pulsoRef, (snapshot) => {
      this.pulso = snapshot.val();
      console.log('Pulso:', this.pulso);
      this.verificarPulsoIrregular();
    });

    onValue(satRef, (snapshot) => {
      this.saturacion = snapshot.val();
      console.log('Saturación de oxígeno:', this.saturacion);
      this.verificarSaturacionBaja();
    });
  }

  verificarPulsoIrregular(): void {
    if (this.pulso !== undefined && (this.pulso > 100 || this.pulso < 60)) {
      console.warn('Pulso irregular, por favor atender');
      this.enviarNotificacion('Pulso irregular', 'Por favor atender al paciente.');
    }
  }

  verificarSaturacionBaja(): void {
    if (this.saturacion !== undefined && this.saturacion < 95) {
      console.warn('Saturación baja, posible hipoxia.');
      this.enviarNotificacion('Saturación baja', 'Por favor atender al paciente. Posible hipoxia.');
    }
  }

  solicitarPermisoNotificaciones(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permiso para notificaciones otorgado.');
        } else {
          console.warn('Permiso para notificaciones denegado.');
        }
      });
    } else {
      console.error('El navegador no soporta notificaciones.');
    }
  }

  enviarNotificacion(titulo: string, mensaje: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(titulo, {
        body: mensaje,
        icon: 'assets/notification-icon.png',
      });
    } else {
      console.warn('No se pudo enviar la notificación. Permiso no otorgado.');
    }
  }
}
