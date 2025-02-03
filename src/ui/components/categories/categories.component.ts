import { Pricing } from "@/core/domain/events/models/response/events.response";
import { addToCart, removeFromCart } from "@/core/store/cart.actions";
import { CurrencyPipe, NgClass, NgStyle } from "@angular/common";
import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import Swal from "sweetalert2";
import { CartItem } from "../../../core/store/cart.reducer";
import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs/internal/Observable";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";

@Component({
    selector: "categories-component",
    imports: [FaIconComponent, NgClass, CurrencyPipe, NgStyle],
    standalone: true,
    templateUrl: "./categories.component.html",
    styleUrl: "./categories.component.scss",
})
export class CategoriesComponent implements OnInit, OnDestroy, OnChanges {
    faTicket = faTicket;

    cart$!: Observable<CartItem[]>;

    cartItems: CartItem[] = [];
    cartSubscription?: Subscription;

    @Input() pricing?: Pricing[];
    @Input() eventId?: number;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.setupCart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["eventId"] && this.eventId !== undefined) {
            this.setupCart();
        }
    }

    private setupCart(): void {
        if (this.eventId !== undefined) {
            this.cart$ = this.store
                .select((state: any) => state.cart[this.eventId!]?.items || [])
                .pipe(
                    distinctUntilChanged(
                        (prev, curr) =>
                            JSON.stringify(prev) === JSON.stringify(curr)
                    )
                );

            this.cartSubscription = this.cart$.subscribe((items) => {
                this.cartItems = items || [];
            });
        }
    }

    async addItem(
        category: string,
        price: number,
        color: string,
        stock: number
    ) {
        const items = await firstValueFrom(this.cart$);

        const existingItem = items.find(
            (item: { category: string }) => item.category === category
        );

        if (existingItem && existingItem.quantity >= 4) {
            Swal.fire(
                "Error",
                "No puedes agregar más de 4 boletos por categoría.",
                "error"
            );
            return;
        }

        if (existingItem && existingItem.quantity + 1 > stock) {
            Swal.fire(
                "Error",
                "No hay suficiente stock para esta categoría.",
                "error"
            );
            return;
        }

        this.store.dispatch(
            addToCart({
                eventId: this.eventId ?? 0,
                category,
                price,
                color,
                stock,
            })
        );
    }

    getAvailableStock(category: string, originalStock: number): number {
        const cartItem = this.cartItems.find(
            (item) => item.category === category
        );

        if (cartItem) {
            return Math.max(0, originalStock - cartItem.quantity);
        } else {
            return originalStock;
        }
    }

    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
