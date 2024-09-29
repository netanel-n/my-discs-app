import { Component } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    template: '<h1>Please sign in.</h1>',
    styleUrl: './landing-page.component.scss',
    host: { 'class': 'page' }
})
export default class LandingPageComponent { }