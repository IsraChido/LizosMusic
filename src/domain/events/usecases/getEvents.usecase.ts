import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventRepository } from "../repositories/event.repository";
import { Event } from "../models/event.response";

@Injectable({
    providedIn: "root",
})
export class GetEventsUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    /**
     * Executes the use case to retrieve all events.
     * @returns Observable<EventResponse> - The observable containing event data.
     */
    execute(): Observable<Event[]> {
        return this.eventRepository.getEvents();
    }
}
