import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { delay } from 'rxjs';

/** For display purposes. */
export function delayInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    return next(req).pipe(delay(1000));
}