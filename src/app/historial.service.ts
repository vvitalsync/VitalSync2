import { Injectable, inject } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { UserService } from './Services/user-service.service';
import { Database, ref, onValue } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

export interface HistorialItem {
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private database = inject(Database);
  private dispositivoRef = ref(this.database, '/Dispositivos/SPET');

  private historialSubject = new BehaviorSubject<HistorialItem[]>([]);
  historial$ = this.historialSubject.asObservable();

  constructor(private userService: UserService) {
    this.loadHistorial();
  }

  private async getStorageKey(): Promise<string> {
    const cedula = this.userService.getUser();
    return `historial_${cedula}`;
  }

  async getHistorial(): Promise<HistorialItem[]> {
    const key = await this.getStorageKey();
    const { value } = await Storage.get({ key });
    return value ? JSON.parse(value) : [];
  }

  async addHistorial(item: HistorialItem): Promise<void> {
    const historialActual = await this.getHistorial();
    historialActual.unshift(item);
    const nuevoHistorial = historialActual.slice(0, 8); // Solo guarda los últimos 8

    await this.setHistorial(nuevoHistorial);
  }

  async setHistorial(historial: HistorialItem[]): Promise<void> {
    const key = await this.getStorageKey();
    await Storage.set({ key, value: JSON.stringify(historial) });
    this.historialSubject.next(historial); // Notificar cambios a los suscriptores
  }

  async clearHistorial(): Promise<void> {
    const key = await this.getStorageKey();
    await Storage.remove({ key });
  }

  private async loadHistorial() {
    onValue(this.dispositivoRef, async (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const pulso = data.sensor?.pulso ?? 'N/A';
      const saturacion = data.sensor?.sat_oxi ?? 'N/A';

      let historialActual = await this.getHistorial();

      if (
        historialActual.length > 0 &&
        historialActual[0].descripcion === `Pulso: ${pulso} bpm, Saturación: ${saturacion}%`
      ) {
        historialActual[0].fecha = new Date().toLocaleString();
      } else {
        historialActual.unshift({
          titulo: 'Medición',
          descripcion: `Pulso: ${pulso} bpm, Saturación: ${saturacion}%`,
          fecha: new Date().toLocaleString(),
        });
      }

      historialActual = historialActual.slice(0, 8);
      await this.setHistorial(historialActual);
    });
  }
}
