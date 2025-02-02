import { HttpInterceptorFn } from "@angular/common/http";

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const clonedRequest = req.clone({
        setHeaders: {
            "x-api-token": "test_api_token_123",
        },
    });

    return next(clonedRequest);
};
