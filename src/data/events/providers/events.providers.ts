import { Provider } from "@angular/core";
import { EventsRepository } from "@/core/domain/events/repositories/events.repository";
import { GetEventsUseCase } from "@/core/domain/events/usecases/getEvents.usecase";
import { GetEventsByIdUseCase } from "@/core/domain/events/usecases/getEventsById.usecase";
import { EventsImplRepository } from "../repositories/events.repository.impl";

export const eventsProviders: Provider[] = [
    { provide: EventsRepository, useClass: EventsImplRepository },
    { provide: GetEventsUseCase, useClass: GetEventsUseCase },
    { provide: GetEventsByIdUseCase, useClass: GetEventsByIdUseCase },
];
