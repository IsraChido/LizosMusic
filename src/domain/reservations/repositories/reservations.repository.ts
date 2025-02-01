import { Observable } from "rxjs";
import {
    ApiResponse,
    ReservationResponse,
} from "../models/reservations.response";
import { ReservationBody } from "../models/reservations.body";

export interface ReservationRepository {
    postReservation(
        body: ReservationBody
    ): Observable<ApiResponse<ReservationResponse>>;
}
