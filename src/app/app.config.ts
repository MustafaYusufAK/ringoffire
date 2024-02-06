import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-a2f52", "appId": "1:209907576719:web:94ad2cae30eb26fe6665fa", "storageBucket": "ring-of-fire-a2f52.appspot.com", "apiKey": "AIzaSyC_jO5phCRNWwe5j5mZhZI-Cys222Nv0mo", "authDomain": "ring-of-fire-a2f52.firebaseapp.com", "messagingSenderId": "209907576719", "measurementId": "G-6QB6QHH4TE" }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
