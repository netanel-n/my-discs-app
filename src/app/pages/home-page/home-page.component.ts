import { Component, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { DiscListComponent } from "../../components/disc-list/disc-list.component";
import { DataReceivedModel } from '../../components/search-input/models/data-received.model';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [SearchInputComponent, DiscListComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    host: { 'class': 'page' }
})
/** Home Page for a SignedIn identity. */
export default class HomePageComponent {
    protected receivedData = signal<null | DataReceivedModel>(null);
}