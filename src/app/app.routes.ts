import { Routes } from '@angular/router';
import { canActivateFunction } from './core/auth/guards/can-activate.guard';
import { pageResolve as discPageResolve } from './pages/disc-page/disc-page.resolve';

export const routes: Routes = [
    {
        path: '',
        title: 'Home Page',
        loadComponent: () => import('./pages/home-page/home-page.component'),
        canActivate: [canActivateFunction]
    },
    {
        path: 'landing-page',
        title: 'Landing Page',
        loadComponent: () => import('./pages/landing-page/landing-page.component'),
        canActivate: [canActivateFunction]
    },
    {
        path: 'sign-in',
        title: 'Sign In',
        loadComponent: () => import('./pages/login-page/login-page.component')
    },
    {
        path: 'sign-up',
        title: 'Sign Up',
        loadComponent: () => import('./pages/user-page/user-page.component')
    },
    {
        path: 'disc/:id',
        title: 'Disc',
        loadComponent: () => import('./pages/disc-page/disc-page.component'),
        canActivate: [canActivateFunction],
        resolve: { pageData: discPageResolve }
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component')
    }
];