import { Component, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { DiscListComponent } from "../../components/disc-list/disc-list.component";
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [SearchInputComponent, DiscListComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    host: { 'class': 'page' }
})
export default class HomePageComponent {
    pageNum = 1;
    dataSource = signal<SimplifiedAlbum[]>([]);

    dataReceived(data: any) {

    }
}