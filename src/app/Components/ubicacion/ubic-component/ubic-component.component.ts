import { GoogleMapsModule } from '@angular/google-maps';
import { Component, OnInit, inject } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserService } from '../../../Services/user-service.service';
/// <reference types="google.maps" />

@Component({
  standalone: true,
  selector: 'app-ubic-component',
  templateUrl: './ubic-component.component.html',
  styleUrls: ['./ubic-component.component.scss'],
})
export class UbicComponentComponent implements OnInit {
  private database = inject(Database);
  private firestore = inject(Firestore);

  latt: number | null = null;
  lngg: number | null = null;
  user: string | null = '';
  dis:  string | null='';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user; // Asignar el usuario
      console.log('Usuario recibido:', this.user);

      if (this.user) {
        // Llamar a la función para obtener el campo "dis"
        this.obtenerCampoDis().then(() => {
          // Llamar a la función para obtener los datos una vez que tengamos "dis"
          this.obtenerDatosRealtimeDatabase();
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
      // Referencia al documento de Firestore
      const userDocRef = doc(this.firestore, `usuario/${this.user}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Obtener el valor del campo "dis"
        this.dis = userDocSnap.data()['dis'];
        console.log('Campo "dis" obtenido de Firestore:', this.dis);
      } else {
        console.warn('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener el campo "dis" de Firestore:', error);
    }
  }

  obtenerDatosRealtimeDatabase(): void {
    if (!this.user) {
      console.warn('Usuario no definido.');
      return;
    }
    const latRef = ref(this.database, `/Dispositivos/${this.dis}/ubi/lat`);
    const lngRef = ref(this.database, `/Dispositivos/${this.dis}/ubi/lng`);

    onValue(latRef, (snapshot) => {
      this.latt = snapshot.val();
      console.log('Latitud actualizada:', this.latt);
      this.verificarEInicializarMapa();
    });

    onValue(lngRef, (snapshot) => {
      this.lngg = snapshot.val();
      console.log('Longitud actualizada:', this.lngg);
      this.verificarEInicializarMapa();
    });
  }

  verificarEInicializarMapa(): void {
    if (this.latt !== null && this.lngg !== null) {
      this.initMap();
    }
  }

  async initMap(): Promise<void> {
    try {
      if (this.latt !== null && this.lngg !== null) {
        const position = { lat: this.latt, lng: this.lngg };

        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

        const map = new Map(document.getElementById('map') as HTMLElement, {
          zoom: 13,
          center: position,
          mapId: 'DEMO_MAP_ID',
        });

        new AdvancedMarkerElement({
          map: map,
          position: position,
          title: 'Ubicación',
        });

        console.log('Mapa inicializado correctamente.');
      } else {
        console.warn('Latitud o longitud no están definidas.');
      }
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }
}
