import { TestBed } from "@angular/core/testing";
import { HttpInterceptorFn } from "@angular/common/http";
import { alertInterceptor } from "./alert.interceptor";

describe("alertInterceptor", () => {
    const interceptor: HttpInterceptorFn = (req, next) =>
        TestBed.runInInjectionContext(() => alertInterceptor(req, next));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });
});
