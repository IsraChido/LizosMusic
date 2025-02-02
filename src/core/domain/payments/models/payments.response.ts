export interface ApiResponse<T> {
    data: T;
}

export interface ReservationResponse {
    message: string;
    data: Reservation;
}

export interface Reservation {
    id: string;
    eventId: number;
    tickets: Ticket[];
    timestamp: Date;
    status: string;
    holdExpiration: Date;
}

export interface Ticket {
    category: string;
    quantity: number;
}
