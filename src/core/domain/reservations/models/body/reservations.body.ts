export interface ReservationBody {
    eventId: number;
    tickets: Ticket[];
}

export interface Ticket {
    category: string;
    quantity: number;
}
