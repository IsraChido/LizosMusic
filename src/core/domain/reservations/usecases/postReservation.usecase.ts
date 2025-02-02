import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReservationRepository } from "../repositories/reservations.repository";
import { ReservationBody } from "../models/reservations.body";
import {
    ApiResponse,
    ReservationResponse,
} from "../models/reservations.response";

@Injectable({
    providedIn: "root",
})
export class GetEventByIdUseCase {
    constructor(
        private readonly reservationRepository: ReservationRepository
    ) {}

    /**
     * Executes the use case to generate a reservation.
     * @param body - The body of the reservation to achieve.
     * @returns Observable<ReservationResponse> - The observable containing the reservation data.
     */
    execute(
        body: ReservationBody
    ): Observable<ApiResponse<ReservationResponse>> {
        return this.reservationRepository.postReservation(body);
    }
}
