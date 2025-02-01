import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EventService } from "../services/events.service";
import { EventRepository } from "../../../domain/events/repositories/event.repository";
import {
    Event,
    EventDetailed,
} from "../../../domain/events/models/event.response";

@Injectable({
    providedIn: "root",
})
export class EventRepositoryImpl implements EventRepository {
    constructor(private readonly eventService: EventService) {}

    /**
     * Fetches all events from the remote data source.
     * @returns Observable<ApiResponse<Event>>
     */
    getEvents(): Observable<Event[]> {
        return this.eventService
            .getEvents()
            .pipe(map((response) => response.data));
    }

    getEventsById(id: string): Observable<EventDetailed> {
        return this.eventService
            .getEventsById(id)
            .pipe(map((response) => response.data));
    }
}
