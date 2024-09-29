import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const canActivateFunction: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (next.routeConfig?.path === 'landing-page') {
        if (!authService.isSignedIn()) return true;
        router.navigate([''], { replaceUrl: true });
        return false;
    }

    if (authService.isSignedIn()) return true;

    router.navigate(['/landing-page'], { replaceUrl: true });
    return false;
}