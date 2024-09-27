import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export default class LoginPageComponent {
    protected readonly formGroup: FormGroup<{
        username: FormControl<string>,
        password: FormControl<string>
    }>;

    constructor(private readonly _authService: AuthService
        , private readonly _router: Router
        , private readonly _formBuilder: FormBuilder) {
        this.formGroup = this.#returnFormGroup();
    }

    submitForm() {
        this._authService.signIn().subscribe(x => {
            this._router.navigate([''], { replaceUrl: true });
        });
    }

    #returnFormGroup() {
        return this._formBuilder.nonNullable.group({
            username: ['yayas65039@aiworldx.com', Validators.required],
            password: ['yayas65039@aiworldx.com', Validators.required]
        });
    }
}