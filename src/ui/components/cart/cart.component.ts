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

@Component({
    selector: "cart-component",
    imports: [FaIconComponent, AsyncPipe, NgFor, NgIf, NgStyle, CurrencyPipe],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnChanges {
    faMinus = faMinus;
    faCartShopping = faCartShopping;

    isProcessing = false;

    @Input() eventId?: number;

    cart$!: Observable<CartItem[]>;

    constructor(
        private store: Store,
        private postReservationUseCase: PostReservationUseCase
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
                    (response) => {
                        Swal.fire({
                            icon: "success",
                            title: "Reserva realizada exitosamente",
                            text: "Tu reserva ha sido procesada con éxito.",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            this.isProcessing = false;
                            this.updateStock(cart);
                            this.clearCart();
                            console.log("Reservation successful", response);
                        });
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
