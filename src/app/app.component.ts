import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, IonicModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VitalSync';

   isSidebarOpen: boolean = false; // Variable para controlar el estado de la barra lateral

  // Método para alternar la barra lateral
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
