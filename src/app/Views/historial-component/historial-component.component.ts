import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user-service.service';
import { Database, ref, onValue, off } from '@angular/fire/database';

@Component({
  standalone: true,
  selector: 'app-historial-component',
  imports: [NgFor, IonicModule],
  templateUrl: './historial-component.component.html',
  styleUrls: ['./historial-component.component.scss'],
})
export class HistorialComponentComponent implements OnInit, OnDestroy {
  historial: any[] = []; // Historial de las últimas 5 mediciones
  user: string | null = null; // Usuario actual
  private database = inject(Database); // Inyección del servicio Database
  private dispositivoRef: any; // Referencia al nodo del dispositivo

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Obtener usuario actual
    this.user = this.userService.getUser ();

    // Verificar si el usuario está autenticado
    if (!this.user) {
      console.error('Usuario no definido. Redirigiendo a login...');
      this.router.navigate(['/login']);
      return;
    }

    // Cargar el historial de Firebase
    this.loadHistorial();
  }

  private loadHistorial() {
    // Referencia al nodo del dispositivo en Firebase
    this.dispositivoRef = ref(this.database, '/Dispositivos/SPET');

    // Escuchar los cambios en tiempo real
    onValue(
      this.dispositivoRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const pulso = data.sensor?.pulso ?? 'N/A';

          // Crear una nueva entrada de historial
          const nuevaEntrada = {
            titulo: 'Medición',
            descripcion: 'Pulso: ' + pulso + ' bpm',
            fecha: new Date().toLocaleString(), // Formato legible para la fecha
          };

          // Insertar la nueva entrada al inicio del historial
          this.historial.push(nuevaEntrada);

          // Mantener solo las últimas 5 entradas
          if (this.historial.length > 5) {
            this.historial.pop();
          }
        } else {
          console.warn('No hay datos disponibles en /Dispositivos/SPET.');
        }
      },
      (error) => {
        console.error('Error al cargar los datos del dispositivo:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Desuscribirse de la referencia al dispositivo
    if (this.dispositivoRef) {
      off(this.dispositivoRef);
    }
  }
}