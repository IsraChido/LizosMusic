import { Observable } from "rxjs";
import { ReservationBody } from "../models/body/reservations.body";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { ReservationResponse } from "../models/response/reservations.response";

export abstract class ReservationApi {
    abstract postReservation(
        body: ReservationBody
    ): Observable<ReservationResponse | ServerErrorResponse>;
}
