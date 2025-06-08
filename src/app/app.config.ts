import { ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_BASE_URL } from './token/api-token';
import { tokenInterceptor } from './core/interceptors/services/auth/token.interceptor';
// import { TestStateService } from './features/services/features/services/test-state.service';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideHttpClient(),
  provideHttpClient(withInterceptors([tokenInterceptor])),

  provideAnimationsAsync(),
  provideAnimations(),
  {
    provide: PLATFORM_ID,
    useValue: PLATFORM_ID
  },
  {
    provide: API_BASE_URL,
    useValue: `http://focusi.runasp.net/api/v1`
  },
]
};


