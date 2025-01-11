import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { Database, ref, objectVal } from '@angular/fire/database';
import { GoogleMapsModule } from '@angular/google-maps';

/// <reference types="google.maps" />
@Component({
  standalone: true,
  selector: 'app-ubic-component',
  templateUrl: './ubic-component.component.html',
  styleUrls: ['./ubic-component.component.scss'],
})
export class UbicComponentComponent implements OnInit, AfterViewInit {
  private database = inject(Database);
  latt: number | undefined = undefined;
  lngg: number | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    this.obtenerDatosFirebase();
  }

  obtenerDatosFirebase() {
    const lattRef = ref(this.database, '/Ubi/lat');
    const lnggRef = ref(this.database, '/Ubi/lng');

    objectVal<number>(lattRef).subscribe((latt) => {
      this.latt = latt;
      this.initMap(); // Inicializa el mapa aquí después de obtener la latitud
    });

    objectVal<number>(lnggRef).subscribe((lngg) => {
      this.lngg = lngg;
      this.initMap(); // Inicializa el mapa aquí después de obtener la longitud
    });
  }

  ngAfterViewInit(): void {
    // Este método se puede dejar vacío si no necesitas hacer nada aquí
    // La inicialización del mapa se maneja en obtenerDatosFirebase
  }

  async initMap(): Promise<void> {
    // Verifica que ambos valores estén definidos
    if (this.latt !== undefined && this.lngg !== undefined) {
      // Posición inicial del mapa
      const position = { lat: this.latt, lng: this.lngg };

      // Importar las bibliotecas necesarias
      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      // Inicializar el mapa centrado en la posición
      const map = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 13,
        center: position,
        mapId: 'DEMO_MAP_ID', // Asegúrate de usar un ID de mapa válido configurado en Google Cloud Console
      });

      // Agregar el marcador en la posición especificada
      new AdvancedMarkerElement({
        map: map,
        position: position,
        title: 'Ubicación',
      });
    } else {
      console.warn("Latitud o longitud no están definidos aún.");
    }
  }
}