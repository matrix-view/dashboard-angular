import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {routes} from './app.routes';

import {provideRouter} from '@angular/router';
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";

import {loggingInterceptor} from "./utils/logging.interceptor";
import {MessageService} from "primeng/api";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import {firebaseConfig} from './config/firebase'

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([loggingInterceptor]),
      withFetch()
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      })
    ),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
