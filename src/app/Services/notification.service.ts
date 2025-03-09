import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messaging: Messaging) {
    this.configurarNotificaciones();
  }

  configurarNotificaciones() {
    // Solicitar permiso para recibir notificaciones
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.warn('Permiso de notificaciones denegado.');
      }
    });

    // Escuchar notificaciones
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notificación recibida:', notification);
      const title = notification.title || 'Notificación sin título'; // Valor predeterminado
      const body = notification.body || 'No hay mensaje disponible'; // Valor predeterminado

      new Notification(title, {
        body: body,
        icon: 'assets/notification-icon.png',
      });
    });
  }

  solicitarPermiso() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        console.log('Permiso de notificaciones concedido.');
        this.obtenerToken();
      } else {
        console.warn('Permiso de notificaciones denegado.');
      }
    });
  }

  obtenerToken() {
    getToken(this.messaging, {
      vapidKey: environment.firebase.vapidKey,
    }).then((token) => {
      if (token) {
        console.log('Token de notificación:', token);
      } else {
        console.warn('No se pudo obtener el token.');
      }
    }).catch((error) => {
      console.error('Error al obtener el token:', error);
    });
  }

  enviarNotificacion(titulo: string, mensaje: string): void {
    if (titulo && mensaje) {
      new Notification(titulo, {
        body: mensaje,
        icon: 'assets/notification-icon.png',
      });
    } else {
      console.warn('No se pudo enviar la notificación. Título o mensaje no válidos.');
    }
  }
}