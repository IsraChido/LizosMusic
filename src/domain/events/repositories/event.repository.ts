import { Observable } from "rxjs";
import { Event, EventDetailed } from "../models/event.response";

export interface EventRepository {
    getEvents(): Observable<Event[]>;
    getEventsById(id: string): Observable<EventDetailed>;
}
