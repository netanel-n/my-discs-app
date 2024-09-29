import { Component, input } from '@angular/core';
import { DiscItemComponent } from "../../components/disc-item/disc-item.component";
import { Album } from '@spotify/web-api-ts-sdk';

@Component({
    selector: 'app-disc-page',
    standalone: true,
    imports: [DiscItemComponent],
    templateUrl: './disc-page.component.html',
    styleUrl: './disc-page.component.scss',
    host: { 'class': 'page' }
})
export default class DiscPageComponent {
    pageData = input.required<Album>();

    constructor() { }
}