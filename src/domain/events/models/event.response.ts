export interface ApiResponse<T> {
    data: T;
}

export interface EventDetailed {
    id: number;
    name: string;
    slug: string;
    start_at: Date;
    end_at: Date;
    status: string;
    tags: string[];
    venue: Venue;
    image_url: string;
    pricing: Pricing[];
    reviews: Reviews;
}

export interface Event extends Omit<EventDetailed, "reviews" | "pricing"> {}

export interface Pricing {
    price: number;
    category: string;
    color: string;
    stock: number;
}

export interface Reviews {
    rating: number;
    count: number;
    recent: Recent[];
}

export interface Recent {
    user: string;
    rating: number;
    comment: string;
}

export interface Venue {
    id: number;
    name: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    timezone: string;
    maps_url: string;
}
