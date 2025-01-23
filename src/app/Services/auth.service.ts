  import { Injectable, inject } from '@angular/core';
  import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User,
  } from '@angular/fire/auth';
  import { authState } from 'rxfire/auth';
  import { Observable, from } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private auth = inject(Auth);

    // Estado del usuario como observable
    authState(): Observable<User | null> {
      return authState(this.auth);
    }

    // Registro
    register(email: string, password: string): Observable<any> {
      return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    // Login
    login(email: string, password: string): Observable<any> {
      return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    // Login con Google
    loginWithGoogle(): Observable<any> {
      const provider = new GoogleAuthProvider();
      return from(signInWithPopup(this.auth, provider));
    }

    // Logout
    logout(): Observable<any> {
      return from(signOut(this.auth));
    }

    // Obtener el usuario actual
    getCurrentUser$(): Observable<User | null> {
      return authState(this.auth);
    }
    
  }
