import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
/// <reference types="google.maps" />
@Component({
  standalone: true,
  selector: 'app-ubic-component',
  templateUrl: './ubic-component.component.html',
  styleUrls: ['./ubic-component.component.scss'],
})
export class UbicComponentComponent  implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Puedes agregar lógica que necesites al iniciar el componente.
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async initMap(): Promise<void> {
    // Posición inicial del mapa
    const position = { lat: -2.904, lng: -78.994 };

    // Importar las bibliotecas necesarias
    //@ts-ignore
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // Inicializar el mapa centrado en la posición
    const map = new Map(document.getElementById('map') as HTMLElement, {
      zoom: 13,
      center: position,
      mapId: 'DEMO_MAP_ID', // Asegúrate de usar un ID de mapa válido configurado en Google Cloud Console
    });
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: 'Uluru'
    });
    // Agregar el marcador en la posición especificada
   
  }
}
