import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { SKIP_AUTH_VALIDATION } from '../context-tokens/context-tokens';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    if (req.context.get(SKIP_AUTH_VALIDATION)) return next(req);

    const authService = inject(AuthService);
    if (!authService.isSignedIn) {
        return of(new HttpResponse({ status: 401 }));
    }

    const authToken = authService.getSignedInInfoData()!.accessToken;
    const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + authToken),
    });
    return next(newReq);
}