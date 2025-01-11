import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule],
  selector: 'app-conf-component',
  templateUrl: './conf-component.component.html',
  styleUrls: ['./conf-component.component.scss'],
})
export class ConfComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  datosTexto: string = 'Consulta información relevante y actualizada de forma clara y sencilla.';
  nuevaImagen: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevaImagen = file; // Guardar la nueva imagen seleccionada
    }
  }

  guardarCambios() {
    console.log('Datos actualizados:', this.datosTexto);
    if (this.nuevaImagen) {
      console.log('Nueva imagen seleccionada:', this.nuevaImagen);
    }
    alert('Cambios guardados exitosamente.');
  }
}
