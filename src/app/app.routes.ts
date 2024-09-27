import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/home-page/home-page.component')
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login-page/login-page.component')
    },
    {
        path: 'disc/:id',
        title: 'Disc',
        loadComponent: () => import('./pages/disc-page/disc-page.component')
    },
    {
        path: 'user/:id',
        title: 'User',
        loadComponent: () => import('./pages/user-page/user-page.component')
    },
    {
        path: '**',
        title: 'Not found',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component')
    }
];