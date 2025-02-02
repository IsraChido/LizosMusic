import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse, ReservationResponse } from "../models/payments.response";
import { PaymentsRepository } from "../repositories/payments.repository";
import { PaymentsBody } from "../models/payments.body";

@Injectable({
    providedIn: "root",
})
export class GetEventByIdUseCase {
    constructor(private readonly paymentsRepository: PaymentsRepository) {}

    /**
     * Executes the use case to generate a reservation.
     * @param body - The body of the reservation to achieve.
     * @returns Observable<ReservationResponse> - The observable containing the reservation data.
     */
    execute(body: PaymentsBody): Observable<ApiResponse<ReservationResponse>> {
        return this.paymentsRepository.postPayments(body);
    }
}
