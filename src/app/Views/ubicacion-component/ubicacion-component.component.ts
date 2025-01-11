import { Component, OnInit } from '@angular/core';
import { UbicComponentComponent } from '../../Components/ubicacion/ubic-component/ubic-component.component';
import { SignosvComponentComponent } from '../../Components/ubicacion/signosv-component/signosv-component.component';

@Component({
  standalone: true,
  selector: 'app-ubicacion-component',
  imports: [UbicComponentComponent, SignosvComponentComponent],
  templateUrl: './ubicacion-component.component.html',
  styleUrls: ['./ubicacion-component.component.scss'],
})
export class UbicacionComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
