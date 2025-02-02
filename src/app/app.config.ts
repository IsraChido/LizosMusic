import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiTokenInterceptor } from "@/core/interceptors/api-token.interceptor";
import { eventsProviders } from "@/data/events/providers/events.providers";
import { spinnerInterceptor } from "@/core/interceptors/spinner.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        eventsProviders,
        provideHttpClient(
            withInterceptors([spinnerInterceptor, apiTokenInterceptor])
        ),
        provideAnimations(),
    ],
};
