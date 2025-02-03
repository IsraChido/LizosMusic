import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import Swal from "sweetalert2";
import { ServerErrorResponse } from "@/common/models/server-error.response";

export const alertInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    return next(req).pipe(
        catchError((error) => {
            if (
                error.error &&
                typeof error.error === "object" &&
                "message" in error.error
            ) {
                const serverError: ServerErrorResponse = error.error;

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        serverError.message ||
                        "Un error inesperado ha ocurrido.",
                    confirmButtonColor: "#d33",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Un error inesperado ha ocurrido, favor de intentarlo de nuevo.",
                    confirmButtonColor: "#d33",
                });
            }

            return throwError(() => error);
        })
    );
};
