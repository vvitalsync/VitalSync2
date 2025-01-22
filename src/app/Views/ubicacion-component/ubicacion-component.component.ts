import { Component, OnInit } from '@angular/core';
import { UbicComponentComponent } from '../../Components/ubicacion/ubic-component/ubic-component.component';
import { SignosvComponentComponent } from '../../Components/ubicacion/signosv-component/signosv-component.component';
import { BotonComponentComponent } from '../../Components/ubicacion/boton-component/boton-component.component';
import { TemplateUbicacionComponent } from './template-ubicacion/template-ubicacion.component';
@Component({
  standalone: true,
  selector: 'app-ubicacion-component',
  imports: [UbicComponentComponent, SignosvComponentComponent, BotonComponentComponent, TemplateUbicacionComponent],
  templateUrl: './ubicacion-component.component.html',
  styleUrls: ['./ubicacion-component.component.scss'],
})
export class UbicacionComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
