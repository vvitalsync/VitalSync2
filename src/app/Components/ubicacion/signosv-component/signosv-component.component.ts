import { Component, OnInit, inject } from '@angular/core';
import { Database, ref, objectVal } from '@angular/fire/database';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-signosv-component',
  imports: [IonicModule],
  templateUrl: './signosv-component.component.html',
  styleUrls: ['./signosv-component.component.scss'],
})
export class SignosvComponentComponent implements OnInit {
  private database = inject(Database);
  pulso: number | undefined = undefined;
  saturacionOxigeno: number | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    this.obtenerDatosFirebase();
  }

  obtenerDatosFirebase() {
    // Referencias a los nodos en Firebase
    const pulsoRef = ref(this.database, '/sensor/pulso');
    const saturacionOxigenoRef = ref(this.database, '/sensor/sat_oxi');

    // Suscripción para obtener el valor del pulso
    objectVal<number>(pulsoRef).subscribe((pulso) => {
      this.pulso = pulso;
    });

    // Suscripción para obtener el valor de la saturación de oxígeno
    objectVal<number>(saturacionOxigenoRef).subscribe((saturacion) => {
      this.saturacionOxigeno = saturacion;
    });
  }
}
