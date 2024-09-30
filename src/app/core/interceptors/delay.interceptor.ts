import { delay } from 'rxjs';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

/** For display purposes. */
export function delayInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    return next(req).pipe(delay(3_000));
}