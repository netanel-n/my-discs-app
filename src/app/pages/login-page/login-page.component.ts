import { Component, DestroyRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { BlockUiService } from '../../components/block-ui/block-ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    host: { 'class': 'page' }
})
export default class LoginPageComponent {
    protected readonly formGroup: FormGroup<{
        username: FormControl<string>,
        password: FormControl<string>
    }>;

    constructor(private readonly _destroyRef: DestroyRef
        , private readonly _authService: AuthService
        , private readonly _blockUiService: BlockUiService
        , private readonly _router: Router
        , private readonly _formBuilder: FormBuilder) {
        this.formGroup = this.#returnFormGroup();
    }

    submitForm() {
        this._blockUiService.block();
        this._authService.signIn().pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(_ => {
                this._blockUiService.unBlock();
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