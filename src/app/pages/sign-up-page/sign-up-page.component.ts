import { Component } from '@angular/core';
import { SignUpFormComponent } from '../../components/sign-up-form/sign-up-form.component';

@Component({
    selector: 'app-sign-up-page',
    standalone: true,
    imports: [SignUpFormComponent],
    templateUrl: './sign-up-page.component.html',
    styleUrl: './sign-up-page.component.scss',
    host: { 'class': 'page' }
})
export default class SignUpPageComponent {
    constructor() { }
}