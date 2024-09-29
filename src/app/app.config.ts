import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { delayInterceptor } from './core/interceptors/delay.interceptor';
import { DatePipe } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
    providers: [
        DatePipe
        , provideZoneChangeDetection({ eventCoalescing: true })
        , provideRouter(routes, withComponentInputBinding())
        , provideAnimationsAsync('noop')
        , { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
        , { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
        , provideHttpClient(withFetch(), withInterceptors([delayInterceptor, authInterceptor]))
    ]
};