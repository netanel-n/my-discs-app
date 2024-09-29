import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
    selector: 'app-sign-out-page',
    standalone: true,
    templateUrl: './sign-out-page.component.html',
    styleUrl: './sign-out-page.component.scss',
    host: { 'class': 'page' }
})
export default class SignOutPageComponent {
    constructor(private readonly _authService: AuthService) {
        this._authService.signOut({ withNavigate: true });
    }
}