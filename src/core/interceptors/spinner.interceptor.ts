import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs/operators";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinnerService = inject(NgxSpinnerService);

    spinnerService.show();

    return next(req).pipe(
        finalize(() => {
            spinnerService.hide();
        })
    );
};
