export interface ServerSuccessResponse<T> {
    data: T;
}

export interface ServerSuccessResponseWithMeta<T> extends ServerSuccessResponse<T> {
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ServerSuccessResponseWithMessage<T> extends ServerSuccessResponse<T> {
    message: string;
}