import { removeFromCart, updateStock } from "@/core/store/cart.actions";
import { CartItem } from "@/core/store/cart.reducer";
import { AsyncPipe, CurrencyPipe, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faMinus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { PostReservationUseCase } from "../../../core/domain/reservations/usecases/postReservation.usecase";
import { ReservationBody } from "@/core/domain/reservations/models/body/reservations.body";
import Swal from "sweetalert2";
import { take } from "rxjs/internal/operators/take";
import { ReservationResponse } from "@/core/domain/reservations/models/response/reservations.response";
import { ServerErrorResponse } from "@/common/models/server-error.response";
import { PostPaymentsUseCase } from "@/core/domain/payments/usecases/postPayments.usecase";
import { PaymentsBody } from "@/core/domain/payments/models/body/payments.body";
import { PaymentsResponse } from "@/core/domain/payments/models/response/payments.response";
import { ModalComponent } from "../modal/modal.component";
import { Router } from "@angular/router";

@Component({
    selector: "cart-component",
    imports: [
        FaIconComponent,
        AsyncPipe,
        NgFor,
        NgIf,
        NgStyle,
        CurrencyPipe,
        ModalComponent,
    ],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnChanges {
    faMinus = faMinus;
    faCartShopping = faCartShopping;

    isProcessing = false;
    isModalOpen = false;
    paymentFinished = false;
    reservationDetails?: ReservationResponse;
    remainingTime: string = "";

    @Input() eventId?: number;

    cart$!: Observable<CartItem[]>;

    constructor(
        private store: Store,
        private router: Router,
        private postReservationUseCase: PostReservationUseCase,
        private postPaymentsUseCase: PostPaymentsUseCase
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["eventId"] && this.eventId) {
            this.cart$ = this.store.select(
                (state: any) => state.cart[this.eventId!]?.items || []
            );
        }
    }

    removeItem(category: string, stock: number, quantity: number) {
        if (this.eventId) {
            this.store.dispatch(
                removeFromCart({ eventId: this.eventId ?? 0, category })
            );

            if (quantity > 0) {
                this.store.dispatch(
                    updateStock({
                        eventId: this.eventId ?? 0,
                        category,
                        newStock: stock + 1,
                    })
                );
            }
        }
    }

    startReservation() {
        if (this.eventId && !this.isProcessing) {
            this.isProcessing = true;
            this.cart$.pipe(take(1)).subscribe((cart) => {
                const reservationBody = this.createReservationBody(cart);
                this.postReservationUseCase.execute(reservationBody).subscribe(
                    (response: ReservationResponse | ServerErrorResponse) => {
                        if ("data" in response) {
                            this.reservationDetails = response;
                            Swal.fire({
                                icon: "success",
                                title: "Reserva realizada",
                                text: `${response.message}`,
                                confirmButtonText: "Aceptar",
                            }).then(() => {
                                this.isProcessing = false;
                                this.updateStock(cart);
                                this.clearCart();
                                this.startCountdown();
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text:
                                    response.message ||
                                    "Hubo un problema con tu reserva. Inténtalo nuevamente.",
                                confirmButtonText: "Aceptar",
                            }).then(() => {
                                this.isProcessing = false;
                            });
                        }
                    },
                    (error) => {
                        console.error("Reservation failed", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hubo un problema con tu reserva. Inténtalo nuevamente.",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            this.isProcessing = false;
                        });
                    }
                );
            });
        }
    }

    startCountdown() {
        if (this.reservationDetails) {
            const holdExpiration = new Date(
                this.reservationDetails.data.holdExpiration
            );
            const currentTime = new Date();
            let remainingTime =
                holdExpiration.getTime() - currentTime.getTime();

            if (remainingTime > 0) {
                this.updateRemainingTime(remainingTime);

                const timerInterval = setInterval(() => {
                    remainingTime -= 1000;
                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        this.remainingTime = "El tiempo expiró para el pago.";
                    } else {
                        this.updateRemainingTime(remainingTime);
                    }
                }, 1000);
            }
        }
    }

    updateRemainingTime(remainingTime: number) {
        const minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        this.remainingTime = `${minutes} minutos y ${seconds} segundos restantes.`;
    }

    processPayment() {
        if (this.remainingTime !== "El tiempo expiró para el pago.") {
            const reservationId = this.reservationDetails?.data?.id;

            if (reservationId) {
                const paymentBody: PaymentsBody = {
                    reservationId: reservationId,
                };

                this.postPaymentsUseCase.execute(paymentBody).subscribe(
                    (response: PaymentsResponse | ServerErrorResponse) => {
                        if ("data" in response) {
                            const tickets = response.data.tickets
                                .map(
                                    (ticket) =>
                                        `${ticket.quantity} x ${ticket.category}`
                                )
                                .join(", ");

                            const message = `Pago exitoso. Detalles del ticket: ${tickets}. Disfruta del evento :)`;

                            this.paymentFinished = true;

                            Swal.fire({
                                icon: "success",
                                title: response.message || "Pago realizado",
                                text: message,
                                confirmButtonText: "Aceptar",
                            }).then(() => {
                                this.router.navigateByUrl("/");
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text:
                                    response.message ||
                                    "Hubo un problema con el pago. Inténtalo nuevamente.",
                                confirmButtonText: "Aceptar",
                            });
                        }
                    },
                    (error) => {
                        console.error("Payment failed", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hubo un problema con el pago. Inténtalo nuevamente.",
                            confirmButtonText: "Aceptar",
                        });
                    }
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo obtener el ID de reserva.",
                    confirmButtonText: "Aceptar",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El tiempo para realizar el pago ha expirado.",
                confirmButtonText: "Aceptar",
            });
        }
    }

    private createReservationBody(cart: CartItem[]): ReservationBody {
        const tickets = cart.map((item) => ({
            category: item.category,
            quantity: item.quantity,
        }));

        return {
            eventId: this.eventId ?? 0,
            tickets: tickets,
        };
    }

    private clearCart() {
        this.store.dispatch({
            type: "[Cart] Clear Cart",
            eventId: this.eventId,
        });
    }

    private updateStock(cart: any[]) {
        cart.forEach((item) => {
            if (item.quantity > 0) {
                this.store.dispatch(
                    updateStock({
                        eventId: this.eventId ?? 0,
                        category: item.category,
                        newStock: item.stock - item.quantity,
                    })
                );
            }
        });
    }
}
