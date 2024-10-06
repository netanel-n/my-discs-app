import { Routes } from '@angular/router';
import { canActivateFunction } from './core/auth/guards/can-activate.guard';
import { pageResolve as discPageResolve } from './pages/disc-page/disc-page.resolve';

/** ToDo: `routes` will be received from a BackEnd via a Service.
 * Insert css class `.page` automatically.
 * Create a StronglyTyped Generics out of `Routes`, To be used in `data` property.
 * `routes` will be the SingleSourceOfTruth.
 * `routeId` is a DataBase mimic. This is an enum.
 */
export const routes: Routes = [
    {
        path: '',
        title: 'Home Page',
        loadComponent: () => import('./pages/home-page/home-page.component'),
        data: { routeId: 1, isVisibleInMenu: 'ifSignedIn' },
        canActivate: [canActivateFunction]
    },
    {
        path: 'landing-page',
        title: 'Landing Page',
        loadComponent: () => import('./pages/landing-page/landing-page.component'),
        data: { routeId: 2, isVisibleInMenu: 'ifNotSignedIn' },
        canActivate: [canActivateFunction]
    },
    {
        path: 'sign-in',
        title: 'Sign In',
        loadComponent: () => import('./pages/sign-in-page/sign-in-page.component'),
        data: { routeId: 3, isVisibleInMenu: 'ifNotSignedIn' }
    },
    {
        path: 'sign-up',
        title: 'Sign Up',
        loadComponent: () => import('./pages/sign-up-page/sign-up-page.component'),
        data: { routeId: 4, isVisibleInMenu: 'ifNotSignedIn' }
    },
    {
        path: 'sign-out',
        title: 'Sign Out',
        loadComponent: () => import('./pages/sign-out-page/sign-out-page.component'),
        data: { routeId: 5, isVisibleInMenu: 'ifSignedIn' }
    },
    {
        path: 'disc/:id',
        title: 'Disc',
        loadComponent: () => import('./pages/disc-page/disc-page.component'),
        data: { routeId: 6, isVisibleInMenu: 'notVisible' },
        canActivate: [canActivateFunction],
        resolve: { pageData: discPageResolve }
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component'),
        data: { routeId: 7, isVisibleInMenu: 'notVisible' }
    }
];