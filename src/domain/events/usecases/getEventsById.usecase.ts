import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventRepository } from "../repositories/event.repository";
import { EventDetailed, ApiResponse } from "../models/event.response";

@Injectable({
    providedIn: "root",
})
export class GetEventByIdUseCase {
    constructor(private eventRepository: EventRepository) {}

    /**
     * Executes the use case to retrieve an event by its ID.
     * @param id - The ID of the event to retrieve.
     * @returns Observable<EventResponse> - The observable containing the event data.
     */
    execute(id: string): Observable<ApiResponse<EventDetailed>> {
        return this.eventRepository.getEventsById(id);
    }
}
