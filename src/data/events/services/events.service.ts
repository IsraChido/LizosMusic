import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
    ApiResponse,
    Event,
    EventDetailed,
} from "../../../domain/events/models/event.response";

@Injectable({
    providedIn: "root",
})
export class EventService {
    private readonly apiUrl = "http://localhost:3000/api/events";

    constructor(private readonly http: HttpClient) {}

    /**
     * Fetches all events from the API.
     * @returns Observable<ApiResponse<Event>>
     */
    getEvents(): Observable<ApiResponse<Event[]>> {
        return this.http.get<ApiResponse<Event[]>>(this.apiUrl);
    }

    /**
     * Fetches an specific event from the API.
     * @returns Observable<ApiResponse<Event>>
     */
    getEventsById(id: string): Observable<ApiResponse<EventDetailed>> {
        return this.http.get<ApiResponse<EventDetailed>>(
            this.apiUrl + "/" + id
        );
    }
}
