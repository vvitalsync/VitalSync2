import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  standalone: true,
  selector: 'app-datos-component',
  imports: [IonicModule],
  templateUrl: './datos-component.component.html',
  styleUrls: ['./datos-component.component.scss'],
})
export class DatosComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
