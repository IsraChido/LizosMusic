import { ServerErrorResponse } from "@/common/models/server-error.response";
import {
    EventsResponse,
    EventsResponseId,
} from "@/core/domain/events/models/response/events.response";
import { EventsApi } from "@/core/domain/events/services/event.api";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/internal/operators/catchError";
import { environment as env } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class EventsService extends EventsApi {
    constructor(private readonly http: HttpClient) {
        super();
    }

    private readonly baseUrl = env.baseHost;
    private readonly endpoint = env.endpoints.events;

    override getEvents(params?: {
        q?: string;
        field?: string;
        page?: string;
    }): Observable<EventsResponse | ServerErrorResponse> {
        const URL = `${this.baseUrl}${this.endpoint}`;

        let httpParams = new HttpParams();

        if (params) {
            if (params.q) {
                httpParams = httpParams.set("q", params.q);
            }
            if (params.field) {
                httpParams = httpParams.set("field", params.field);
            }
            if (params.page) {
                httpParams = httpParams.set("page", params.page);
            }
        }

        httpParams = httpParams.set("limit", "8");

        return this.http
            .get<EventsResponse>(URL, { params: httpParams })
            .pipe(catchError(this.handleError));
    }

    override getEventsById(
        id: string
    ): Observable<EventsResponseId | ServerErrorResponse> {
        const URL = `${this.baseUrl}${this.endpoint}/${id}`;

        return this.http
            .get<EventsResponseId>(URL)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Observable<ServerErrorResponse> {
        if (error && error.error && error.error.message) {
            return of({ message: error.error.message });
        }

        return of({ message: "An unexpected error occurred." });
    }
}
