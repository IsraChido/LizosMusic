import { Observable } from "rxjs/internal/Observable";

export interface UseCase<S, T> {
    execute(params: S): Observable<T>;
}
