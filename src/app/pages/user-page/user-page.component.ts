import { Component } from '@angular/core';
import { UserDetailsComponent } from "../../components/user-details/user-details.component";

@Component({
    selector: 'app-user-page',
    standalone: true,
    imports: [UserDetailsComponent],
    templateUrl: './user-page.component.html',
    styleUrl: './user-page.component.scss',
    host: { 'class': 'page' }
})
export default class UserPageComponent {
    constructor() { }
}