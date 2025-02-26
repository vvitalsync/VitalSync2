import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user-service.service';
import { HistorialService, HistorialItem } from '../../historial.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-historial-component',
  imports: [NgFor, IonicModule],
  templateUrl: './historial-component.component.html',
  styleUrls: ['./historial-component.component.scss'],
})
export class HistorialComponentComponent implements OnInit, OnDestroy {
  historial: HistorialItem[] = [];
  user: string | null = null;
  private historialSubscription!: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private historialService: HistorialService
  ) {}

  async ngOnInit() {
    this.user = this.userService.getUser();

    if (!this.user) {
      console.error('Usuario no definido. Redirigiendo a login...');
      this.router.navigate(['/login']);
      return;
    }

    // Suscribirse a los cambios en el historial en tiempo real
    this.historialSubscription = this.historialService.historial$.subscribe((historial) => {
      this.historial = historial;
    });

    // Cargar historial almacenado localmente
    this.historial = await this.historialService.getHistorial();
  }

  ngOnDestroy(): void {
    if (this.historialSubscription) {
      this.historialSubscription.unsubscribe();
    }
  }
}
