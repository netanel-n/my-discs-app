import { Routes } from '@angular/router';
import { canActivateFunction } from './core/auth/guards/can-activate.guard';
import { pageResolve as discPageResolve } from './pages/disc-page/disc-page.resolve';

/** `routes` will be received from a BackEnd via a Service.
 * ToDo: Create a StronglyTyped Generics out of `Routes`, To be used in `data` property.
 * `routes` will be the SingleSourceOfTruth.
 */
export const routes: Routes = [
    {
        path: '',
        title: 'Home Page',
        loadComponent: () => import('./pages/home-page/home-page.component'),
        data: { isVisibleInMenu: 'ifSignedIn' },
        canActivate: [canActivateFunction]
    },
    {
        path: 'landing-page',
        title: 'Landing Page',
        loadComponent: () => import('./pages/landing-page/landing-page.component'),
        data: { isVisibleInMenu: 'ifNotSignedIn' },
        canActivate: [canActivateFunction]
    },
    {
        path: 'sign-in',
        title: 'Sign In',
        loadComponent: () => import('./pages/login-page/login-page.component'),
        data: { isVisibleInMenu: 'ifNotSignedIn' },
    },
    {
        path: 'sign-up',
        title: 'Sign Up',
        loadComponent: () => import('./pages/user-page/user-page.component'),
        data: { isVisibleInMenu: 'ifNotSignedIn' },
    },
    {
        path: 'sign-out',
        title: 'Sign Out',
        loadComponent: () => import('./pages/sign-out-page/sign-out-page.component'),
        data: { isVisibleInMenu: 'ifSignedIn' },
    },
    {
        path: 'disc/:id',
        title: 'Disc',
        loadComponent: () => import('./pages/disc-page/disc-page.component'),
        data: { isVisibleInMenu: 'notVisible' },
        canActivate: [canActivateFunction],
        resolve: { pageData: discPageResolve }
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component'),
        data: { isVisibleInMenu: 'notVisible' },
    }
];