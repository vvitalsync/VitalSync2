import { Component, OnInit } from '@angular/core';
import { UbicComponentComponent } from '../../Components/ubicacion/ubic-component/ubic-component.component';
import { SignosvComponentComponent } from '../../Components/ubicacion/signosv-component/signosv-component.component';
import { FirebaseService } from '../../Services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ubicacion-component',
  imports: [UbicComponentComponent, SignosvComponentComponent],
  templateUrl: './ubicacion-component.component.html',
  styleUrls: ['./ubicacion-component.component.scss'],
})
export class UbicacionComponentComponent  implements OnInit {
  pulso: number | null = null;
  satOxi: number | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getSensorData().subscribe((data: any) => {
      if (data) {
        this.pulso = data.pulso;
        this.satOxi = data.sat_oxi;
      }
    });
  }
}
