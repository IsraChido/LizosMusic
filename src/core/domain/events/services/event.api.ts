import { Observable } from "rxjs";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import {
    EventsResponse,
    EventsResponseId,
} from "../models/response/events.response";

export abstract class EventsApi {
    abstract getEvents(params?: {
        q?: string;
        field?: string;
        page?: string;
    }): Observable<EventsResponse | ServerErrorResponse>;
    abstract getEventsById(
        id: string
    ): Observable<EventsResponseId | ServerErrorResponse>;
}
