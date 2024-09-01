import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuthStoreConfiguration } from '@simple-nx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withViewTransitions()),
    provideAnimations(),
    provideStore(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: false,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 50,
    }),
    provideAuthStoreConfiguration(),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (store: Store) => () => {
    //     store.dispatch(getCards());
    //   },
    //   multi: true,
    //   deps: [Store],
    // },
  ],
};
