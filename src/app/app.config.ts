import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
export const appConfig: ApplicationConfig = {
  providers: [ provideFirebaseApp(() => initializeApp({ ...environment.firebase })),
    provideDatabase(() => getDatabase()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideIonicAngular({})]
};
