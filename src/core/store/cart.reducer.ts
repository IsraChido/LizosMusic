import { createReducer, on } from "@ngrx/store";
import {
    addToCart,
    clearCart,
    removeFromCart,
    updateStock,
} from "./cart.actions";

export interface CartItem {
    category: string;
    price: number;
    color: string;
    stock: number;
    quantity: number;
}

export interface CartState {
    [eventId: number]: {
        items: CartItem[];
    };
}

export const initialState: CartState = {};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { eventId, category, price, color, stock }) => {
        const currentCart = state[eventId] || { items: [] };

        const existingItem = currentCart.items.find(
            (item) => item.category === category
        );

        if (existingItem) {
            if (existingItem.quantity < 4 && existingItem.quantity < stock) {
                return {
                    ...state,
                    [eventId]: {
                        ...currentCart,
                        items: currentCart.items.map((item) =>
                            item.category === category
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    },
                };
            } else {
                return state;
            }
        }

        return {
            ...state,
            [eventId]: {
                ...currentCart,
                items: [
                    ...currentCart.items,
                    { category, price, color, stock, quantity: 1 },
                ],
            },
        };
    }),

    on(removeFromCart, (state, { eventId, category }) => {
        const currentCart = state[eventId] || { items: [] };

        return {
            ...state,
            [eventId]: {
                ...currentCart,
                items: currentCart.items
                    .map((item) =>
                        item.category === category
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            },
        };
    }),

    on(updateStock, (state, { eventId, category, newStock }) => {
        const currentCart = state[eventId] || { items: [] };

        return {
            ...state,
            [eventId]: {
                ...currentCart,
                items: currentCart.items.map((item) =>
                    item.category === category
                        ? { ...item, stock: newStock }
                        : item
                ),
            },
        };
    }),

    on(clearCart, (state, { eventId }) => {
        const { [eventId]: removed, ...newState } = state;
        return newState;
    })
);
