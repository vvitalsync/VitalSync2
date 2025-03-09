import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  async getPhotoFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri, // Obtiene la URL de la imagen
        source: CameraSource.Photos, // Abre la galería
      });
      return image;
    } catch (error) {
      console.error('Error al obtener la foto:', error);
      return null;
    }
  }
}