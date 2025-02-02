import { Observable } from "rxjs";
import {
    EventsResponse,
    EventsResponseId,
} from "../models/response/events.response";
import { ServerErrorResponse } from "@/common/models/server-error.response";

export abstract class EventsRepository {
    abstract getEvents(params?: {
        q?: string;
        field?: string;
        page?: string;
    }): Observable<EventsResponse | ServerErrorResponse>;
    abstract getEventsById(
        id: string
    ): Observable<EventsResponseId | ServerErrorResponse>;
}
