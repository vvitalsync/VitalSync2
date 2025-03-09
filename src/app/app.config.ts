import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
export const appConfig: ApplicationConfig = {
  providers: [ provideFirebaseApp(() => initializeApp({ ...environment.firebase })), provideMessaging(() => getMessaging()),provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),provideAuth(() => getAuth()), provideRouter(routes), provideIonicAngular({})]
};