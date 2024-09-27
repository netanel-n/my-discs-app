import { Component } from '@angular/core';
import { DiscItemComponent } from "../../components/disc-item/disc-item.component";

@Component({
    selector: 'app-disc-page',
    standalone: true,
    imports: [DiscItemComponent],
    templateUrl: './disc-page.component.html',
    styleUrl: './disc-page.component.scss'
})
export default class DiscPageComponent {

}