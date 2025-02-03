import { createAction, props } from "@ngrx/store";

export const addToCart = createAction(
    "[Cart] Add To Cart",
    props<{
        eventId: number;
        category: string;
        price: number;
        color: string;
        stock: number;
    }>()
);

export const removeFromCart = createAction(
    "[Cart] Remove From Cart",
    props<{ eventId: number; category: string }>()
);

export const updateStock = createAction(
    "[Cart] Update Stock",
    props<{ eventId: number; category: string; newStock: number }>()
);

export const clearCart = createAction(
    "[Cart] Clear Cart",
    props<{ eventId: number }>()
);
