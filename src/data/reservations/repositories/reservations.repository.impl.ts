import { Observable, filter, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { ReservationRepository } from "@/core/domain/reservations/repositories/reservations.repository";
import { ReservationService } from "../services/reservations.service";
import { ReservationBody } from "@/core/domain/reservations/models/body/reservations.body";
import { ReservationResponse } from "@/core/domain/reservations/models/response/reservations.response";

@Injectable({
    providedIn: "root",
})
export class ReservationImplRepository extends ReservationRepository {
    constructor(private readonly reservationService: ReservationService) {
        super();
    }

    override postReservation(
        body: ReservationBody
    ): Observable<ReservationResponse | ServerErrorResponse> {
        return this.reservationService.postReservation(body).pipe(
            filter(
                (response: ReservationResponse | ServerErrorResponse) =>
                    response !== null
            ),
            switchMap((response: ReservationResponse | ServerErrorResponse) => {
                const events = response;
                return of(events);
            })
        );
    }
}
