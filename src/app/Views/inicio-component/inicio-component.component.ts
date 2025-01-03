import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImagenComponentComponent } from '../../Components/inicio/imagen-component/imagen-component.component';
import { DatosComponentComponent } from '../../Components/inicio/datos-component/datos-component.component';
import { ConfComponentComponent } from '../../Components/inicio/conf-component/conf-component.component';
import { ConfiguracionComponentComponent } from '../../Components/inicio/configuracion-component/configuracion-component.component';

@Component({
  standalone: true,
  selector: 'app-inicio-component',
  imports: [IonicModule, ImagenComponentComponent, DatosComponentComponent, ConfComponentComponent, ConfiguracionComponentComponent],
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.scss'],
})
export class InicioComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
