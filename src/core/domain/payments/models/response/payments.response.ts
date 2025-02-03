import { ServerSuccessResponseWithMessage } from "@/common/models/server-success.response";

export interface Payments {
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

export type PaymentsResponse = ServerSuccessResponseWithMessage<Payments>;
