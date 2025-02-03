import { ReservationRepository } from "@/core/domain/reservations/repositories/reservations.repository";
import { PostReservationUseCase } from "@/core/domain/reservations/usecases/postReservation.usecase";
import { Provider } from "@angular/core";
import { ReservationImplRepository } from "../repositories/reservations.repository.impl";

export const reservationProviders: Provider[] = [
    { provide: ReservationRepository, useClass: ReservationImplRepository },
    { provide: PostReservationUseCase, useClass: PostReservationUseCase },
];
