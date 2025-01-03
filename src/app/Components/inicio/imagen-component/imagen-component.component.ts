import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-imagen-component',
  imports: [IonicModule],
  templateUrl: './imagen-component.component.html',
  styleUrls: ['./imagen-component.component.scss'],
})
export class ImagenComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
