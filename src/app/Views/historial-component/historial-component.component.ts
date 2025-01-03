import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-historial-component',
  imports: [NgFor, IonicModule],
  templateUrl: './historial-component.component.html',
  styleUrls: ['./historial-component.component.scss'],
})
export class HistorialComponentComponent  implements OnInit {
  historial = [
    {
      titulo: 'Medición 1',
      descripcion: 'Pulso: 72 bpm, Saturación: 98%',
      fecha: '2025-01-01 10:00 AM',
    },
    {
      titulo: 'Medición 2',
      descripcion: 'Pulso: 75 bpm, Saturación: 97%',
      fecha: '2025-01-01 12:00 PM',
    },
    {
      titulo: 'Medición 3',
      descripcion: 'Pulso: 70 bpm, Saturación: 99%',
      fecha: '2025-01-01 03:00 PM',
    },
  ];
  constructor() { }

  ngOnInit() {}

}
