import { InjectionToken, Provider } from "@angular/core";
import { EventRepositoryImpl } from "../repositories/events.repository.impl";
import { EventRepository } from "../../../domain/events/repositories/event.repository";

export const EVENT_REPOSITORY = new InjectionToken<EventRepository>(
    "EventRepository"
);
// Exporting an array of providers
export const eventsProviders: Provider[] = [
    { provide: EVENT_REPOSITORY, useClass: EventRepositoryImpl },
];
