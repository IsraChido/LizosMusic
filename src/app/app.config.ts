import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiTokenInterceptor } from "@/core/interceptors/api-token.interceptor";
import { eventsProviders } from "@/data/events/providers/events.providers";
import { spinnerInterceptor } from "@/core/interceptors/spinner.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";
import { alertInterceptor } from "@/core/interceptors/alert.interceptor";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { cartReducer } from "@/core/store/cart.reducer";
import { reservationProviders } from "@/data/reservations/providers/reservations.providers";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        eventsProviders,
        reservationProviders,
        provideHttpClient(
            withInterceptors([
                spinnerInterceptor,
                apiTokenInterceptor,
                alertInterceptor,
            ])
        ),
        provideAnimations(),
        provideStore({ cart: cartReducer }),
        provideEffects(),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ],
};
