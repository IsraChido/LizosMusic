import { ServerErrorResponse } from "../../../../../common/models/server-error.response";
import { ServerSuccessResponse, ServerSuccessResponseWithMeta } from "../../../../../common/models/server-success.response";

export type EventArray = Event[];

export interface EventDetailed extends Event {
    pricing: Pricing[];
    reviews: Reviews;
}

export interface Event {
    id:        number;
    name:      string;
    slug:      string;
    start_at:  Date;
    end_at:    Date;
    status:    string;
    tags:      string[];
    venue:     Venue;
    image_url: string;
}


export interface Venue {
    id:      number;
    name:    string;
    city:    string;
    state:   string;
    country: string;
}

export interface Pricing {
    price:    number;
    category: string;
    color:    string;
    stock:    number;
}

export interface Reviews {
    rating: number;
    count:  number;
    recent: Review[];
}

export interface Review {
    user:    string;
    rating:  number;
    comment: string;
}

export type EventsResponse = ServerSuccessResponseWithMeta<EventArray>;
export type EventsResponseId = ServerSuccessResponse<EventDetailed>;
