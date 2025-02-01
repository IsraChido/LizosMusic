import { Observable } from "rxjs";
import { ApiResponse, ReservationResponse } from "../models/payments.response";
import { PaymentsBody } from "../models/payments.body";

export interface PaymentsRepository {
    postPayments(
        body: PaymentsBody
    ): Observable<ApiResponse<ReservationResponse>>;
}
