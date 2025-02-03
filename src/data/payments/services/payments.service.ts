import { ServerErrorResponse } from "@/common/models/server-error.response";
import { PaymentsBody } from "@/core/domain/payments/models/body/payments.body";
import { PaymentsResponse } from "@/core/domain/payments/models/response/payments.response";
import { PaymentsApi } from "@/core/domain/payments/services/payments.api";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/internal/operators/catchError";
import { environment as env } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class PaymentsService extends PaymentsApi {
    constructor(private readonly http: HttpClient) {
        super();
    }

    private readonly baseUrl = env.baseHost;
    private readonly endpoint = env.endpoints.payments;

    override postPayments(
        body: PaymentsBody
    ): Observable<PaymentsResponse | ServerErrorResponse> {
        const URL = `${this.baseUrl}${this.endpoint}`;

        return this.http
            .post<PaymentsResponse>(URL, body)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Observable<ServerErrorResponse> {
        if (error && error.error && error.error.message) {
            return of({ message: error.error.message });
        }

        return of({ message: "An unexpected error occurred." });
    }
}
