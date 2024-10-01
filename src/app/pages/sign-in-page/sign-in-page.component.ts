import { Component } from '@angular/core';
import { SignInFormComponent } from "../../components/sign-in-form/sign-in-form.component";

@Component({
    selector: 'app-sign-in-page',
    standalone: true,
    imports: [SignInFormComponent],
    templateUrl: './sign-in-page.component.html',
    styleUrl: './sign-in-page.component.scss',
    host: { 'class': 'page' }
})
export default class SignInPageComponent { }