import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UseCase } from "@/core/base/use-case";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { ReservationBody } from "../models/body/reservations.body";
import { ReservationRepository } from "../repositories/reservations.repository";
import { ReservationResponse } from "../models/response/reservations.response";

@Injectable({
    providedIn: "root",
})
export class PostReservationUseCase
    implements
        UseCase<ReservationBody, ReservationResponse | ServerErrorResponse>
{
    constructor(private readonly repository: ReservationRepository) {}
    execute(
        body: ReservationBody
    ): Observable<ReservationResponse | ServerErrorResponse> {
        return this.repository.postReservation(body);
    }
}
