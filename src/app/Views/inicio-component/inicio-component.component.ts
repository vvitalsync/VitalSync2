import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar el Router
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../Services/user-service.service';
import { ImagenComponentComponent } from '../../Components/inicio/imagen-component/imagen-component.component';
import { DatosComponentComponent } from '../../Components/inicio/datos-component/datos-component.component';
import { ConfiguracionComponentComponent } from '../../Components/inicio/configuracion-component/configuracion-component.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-inicio-component',
  imports: [IonicModule, ImagenComponentComponent, DatosComponentComponent, ConfiguracionComponentComponent, NgIf],
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.scss'],
})
export class InicioComponentComponent implements OnInit {
  user: string | null = null;

  constructor(private userService: UserService, private router: Router) {} // Agregar Router

  ngOnInit() {
    // Obtener el usuario actual al iniciar el componente
    this.user = this.userService.getUser();
  }

}
