import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../../../Services/user-service.service';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule],
  selector: 'app-conf-component',
  templateUrl: './conf-component.component.html',
  styleUrls: ['./conf-component.component.scss'],
})
export class ConfComponentComponent implements OnInit {
  texto: string = '';
  nuevaImagen: File | null = null;
  nombre: string = '';
  edad: number | null = null;
  dispositivo: string = '';
  user : string | null= '';
  constructor(private firestore: Firestore, private userService: UserService,) {}

  async ngOnInit() {
    this.user = this.userService.getUser();
    console.log('Usuario:', this.user);

    if (this.user) {
      // Obtener el valor de "dis" desde Firestore y luego suscribirse a Firebase
      this.cargarDatos().then(() => {

      });
    } else {
      console.error('Usuario no definido.');
    }
  }

  // Método para cargar los datos desde Firestore
  async cargarDatos() {
    try {
      const infoRef = doc(this.firestore, 'usuario/'+this.user);
      const docSnapshot = await getDoc(infoRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.texto = data['texto'] || '';
        this.nombre = data['nombre'] || '';
        this.edad = data['edad'] || null;
        this.dispositivo = data['dis'] || null;
      } else {
        console.log('No se encontraron datos en Firestore.');
      }
    } catch (error) {
      console.error('Error al cargar datos de Firestore:', error);
    }
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevaImagen = file;
    }
  }

  // Método para guardar los cambios en Firestore
  async guardarCambios() {
    try {
      const infoRef = doc(this.firestore, 'usuario/'+this.user);

      // Subir imagen a Firebase Storage si existe
      let imagenURL: string | null = null;
      if (this.nuevaImagen) {
        const storage = getStorage();
        const filePath = `images/${uuidv4()}_${this.nuevaImagen.name}`;
        const fileRef = ref(storage, filePath);

        // Subir el archivo y obtener la URL de descarga
        await uploadBytes(fileRef, this.nuevaImagen);
        imagenURL = await getDownloadURL(fileRef);
      }

      // Crear objeto con los campos a actualizar
      const datosActualizados: any = {};
      if (this.texto) datosActualizados.texto = this.texto;
      if (this.nombre) datosActualizados.nombre = this.nombre;
      if (this.edad !== null) datosActualizados.edad = this.edad;
      if (this.dispositivo) datosActualizados.dis = this.dispositivo;
      if (imagenURL) datosActualizados.img = imagenURL;

      // Actualizar los datos en Firestore
      await updateDoc(infoRef, datosActualizados);

      console.log('Datos guardados exitosamente en Firestore:', datosActualizados);

      // Recargar los datos en el formulario
      await this.cargarDatos();
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  }
}
