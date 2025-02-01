import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { eventsProviders } from "../data/events/providers/events.providers";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes), eventsProviders],
};
