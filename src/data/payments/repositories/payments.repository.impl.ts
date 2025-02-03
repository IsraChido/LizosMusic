import { Observable, filter, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { PaymentsBody } from "@/core/domain/payments/models/body/payments.body";
import { PaymentsResponse } from "@/core/domain/payments/models/response/payments.response";
import { PaymentsRepository } from "@/core/domain/payments/repositories/payments.repository";
import { PaymentsService } from "../services/payments.service";

@Injectable({
    providedIn: "root",
})
export class PaymentsImplRepository extends PaymentsRepository {
    constructor(private readonly paymentsService: PaymentsService) {
        super();
    }

    override postPayments(
        body: PaymentsBody
    ): Observable<PaymentsResponse | ServerErrorResponse> {
        return this.paymentsService.postPayments(body).pipe(
            filter(
                (response: PaymentsResponse | ServerErrorResponse) =>
                    response !== null
            ),
            switchMap((response: PaymentsResponse | ServerErrorResponse) => {
                const events = response;
                return of(events);
            })
        );
    }
}
