import { Component } from '@angular/core';

@Component({
    selector: 'app-not-found-page',
    standalone: true,
    template: '<h1>Not found</h1>',
    styleUrl: './not-found-page.component.scss',
    host: { 'class': 'page' }
})
export default class NotFoundPageComponent { }