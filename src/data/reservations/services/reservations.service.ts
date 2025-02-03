import { ServerErrorResponse } from "@/common/models/server-error.response";
import { ReservationResponse } from "@/core/domain/payments/models/payments.response";
import { ReservationBody } from "@/core/domain/reservations/models/body/reservations.body";
import { ReservationApi } from "@/core/domain/reservations/services/reservations.api";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/internal/operators/catchError";
import { environment as env } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ReservationService extends ReservationApi {
    constructor(private readonly http: HttpClient) {
        super();
    }

    private readonly baseUrl = env.baseHost;
    private readonly endpoint = env.endpoints.reservations;

    override postReservation(
        body: ReservationBody
    ): Observable<ReservationResponse | ServerErrorResponse> {
        const URL = `${this.baseUrl}${this.endpoint}`;

        return this.http
            .post<ReservationResponse>(URL, body)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Observable<ServerErrorResponse> {
        if (error && error.error && error.error.message) {
            return of({ message: error.error.message });
        }

        return of({ message: "An unexpected error occurred." });
    }
}
