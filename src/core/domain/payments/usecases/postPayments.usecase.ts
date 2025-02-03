import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UseCase } from "@/core/base/use-case";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { PaymentsBody } from "../models/body/payments.body";
import { PaymentsResponse } from "../models/response/payments.response";
import { PaymentsRepository } from "../repositories/payments.repository";

@Injectable({
    providedIn: "root",
})
export class PostPaymentsUseCase
    implements UseCase<PaymentsBody, PaymentsResponse | ServerErrorResponse>
{
    constructor(private readonly repository: PaymentsRepository) {}
    execute(
        body: PaymentsBody
    ): Observable<PaymentsResponse | ServerErrorResponse> {
        return this.repository.postPayments(body);
    }
}
