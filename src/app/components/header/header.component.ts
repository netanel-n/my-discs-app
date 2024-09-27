import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(public readonly router: Router
        , protected readonly authService: AuthService) { }
}