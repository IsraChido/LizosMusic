import { Observable } from "rxjs";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { PaymentsBody } from "../models/body/payments.body";
import { PaymentsResponse } from "../models/response/payments.response";

export abstract class PaymentsRepository {
    abstract postPayments(
        body: PaymentsBody
    ): Observable<PaymentsResponse | ServerErrorResponse>;
}
