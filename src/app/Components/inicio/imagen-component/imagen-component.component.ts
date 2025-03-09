import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../../Services/camera.service'; // Ajusta la ruta según tu estructura
import { Preferences } from '@capacitor/preferences';

@Component({
  standalone: true,
  selector: 'app-imagen-component',
  templateUrl: './imagen-component.component.html',
  styleUrls: ['./imagen-component.component.scss'],
})
export class ImagenComponentComponent implements OnInit {
  photoUrl: string | null = null;
  defaultPhotoUrl = '/assets/user.png'; // Ruta de la imagen por defecto

  constructor(private cameraService: CameraService) {}

  async ngOnInit() {
    // Cargar la foto guardada al iniciar el componente
    const { value } = await Preferences.get({ key: 'userPhoto' });
    this.photoUrl = value ?? null; // Convierte undefined a null
  }

  async selectPhoto() {
    try {
      const photo = await this.cameraService.getPhotoFromGallery();
      if (photo && photo.webPath) { // Verifica que photo.webPath exista
        this.photoUrl = photo.webPath; // URL temporal para mostrar la imagen
        // Guardar la foto en Preferences
        await Preferences.set({ key: 'userPhoto', value: photo.webPath });
      } else {
        this.photoUrl = null; // Si no hay webPath, usa null
      }
    } catch (error) {
      console.error('Error al seleccionar la foto:', error);
      this.photoUrl = null; // Si hay error, vuelve a la imagen por defecto
    }
  }

  async deletePhoto() {
    await Preferences.remove({ key: 'userPhoto' });
    this.photoUrl = null;
  }
}