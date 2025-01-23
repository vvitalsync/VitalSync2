import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { UserService } from '../../../Services/user-service.service';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-imagen-component',
  templateUrl: './imagen-component.component.html',
  styleUrls: ['./imagen-component.component.scss'],
})
export class ImagenComponentComponent implements OnInit {
  userImage: string= "/assets/user.png";
  constructor(private userService: UserService,) {}

  ngOnInit(): void {

  }

}

