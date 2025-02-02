import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "@/core/base/use-case";
import { EventsResponseId } from "../models/response/events.response";
import { EventsRepository } from "../repositories/events.repository";
import { ServerErrorResponse } from "@/common/models/server-error.response";


@Injectable({
    providedIn: 'root',
})
export class GetEventsByIdUseCase implements UseCase<string, EventsResponseId | ServerErrorResponse> {
    constructor(private readonly repository: EventsRepository){}
    execute(id: string): Observable<EventsResponseId | ServerErrorResponse> {
        return this.repository.getEventsById(id);
    }
}