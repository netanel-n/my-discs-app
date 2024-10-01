import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SKIP_AUTH_VALIDATION } from '../context-tokens/context-tokens';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (req.context.get(SKIP_AUTH_VALIDATION)) return next(req);

    const authService = inject(AuthService);

    // Technically.. This is not possible.. This is just another layer of security..
    if (!authService.isSignedIn()) {
        return autoSignOut(authService);
    }

    const authToken = authService.getSignedInInfoData()!.accessToken;
    const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + authToken),
    });

    return next(newReq).pipe(catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === 401) {
            return autoSignOut(authService);
        }

        return throwError(() => httpErrorResponse);
    }));
};

const autoSignOut = (authService: AuthService) => {
    const httpResponseUnauthorized = of(new HttpResponse({ status: 401 }));
    authService.signOut({ withNavigate: true, withReason: true, withUnBlockUi: true });
    return httpResponseUnauthorized;
};