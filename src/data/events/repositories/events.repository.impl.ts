import { Observable, filter, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { EventsRepository } from "@/core/domain/events/repositories/events.repository";
import { EventsService } from "../services/events.service";
import {
    EventsResponse,
    EventsResponseId,
} from "@/core/domain/events/models/response/events.response";
import { ServerErrorResponse } from "@/common/models/server-error.response";

@Injectable({
    providedIn: "root",
})
export class EventsImplRepository extends EventsRepository {
    constructor(private readonly eventsService: EventsService) {
        super();
    }

    override getEvents(params?: {
        q?: string;
        field?: string;
        page?: string;
    }): Observable<EventsResponse | ServerErrorResponse> {
        return this.eventsService.getEvents(params).pipe(
            filter(
                (response: EventsResponse | ServerErrorResponse) =>
                    response !== null
            ),
            switchMap((response: EventsResponse | ServerErrorResponse) => {
                const events = response;
                return of(events);
            })
        );
    }

    override getEventsById(
        id: string
    ): Observable<EventsResponseId | ServerErrorResponse> {
        return this.eventsService.getEventsById(id).pipe(
            filter(
                (response: EventsResponseId | ServerErrorResponse) =>
                    response !== null
            ),
            switchMap((response: EventsResponseId | ServerErrorResponse) => {
                const detailedEvent = response;
                return of(detailedEvent);
            })
        );
    }
}
