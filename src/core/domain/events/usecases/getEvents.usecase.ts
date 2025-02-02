import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UseCase } from "@/core/base/use-case";
import { EventsResponse } from "../models/response/events.response";
import { EventsRepository } from "../repositories/events.repository";
import { ServerErrorResponse } from "@/common/models/server-error.response";

@Injectable({
    providedIn: "root",
})
export class GetEventsUseCase
    implements
        UseCase<
            {
                q?: string;
                field?: string;
                page?: string;
            },
            EventsResponse | ServerErrorResponse
        >
{
    constructor(private readonly repository: EventsRepository) {}
    execute(params?: {
        q?: string;
        field?: string;
    }): Observable<EventsResponse | ServerErrorResponse> {
        return this.repository.getEvents(params);
    }
}
