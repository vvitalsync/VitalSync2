import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Usamos BehaviorSubject para almacenar y emitir el valor actual de 'user'
  private userSource = new BehaviorSubject<string | null>(null);
  user$ = this.userSource.asObservable();

  constructor() {}

  // Método para actualizar el valor del usuario
  setUser(user: string): void {
    this.userSource.next(user);
  }

  // Método para obtener el valor actual del usuario
  getUser(): string | null {
    return this.userSource.value;
  }
}
