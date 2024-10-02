import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUiService } from '../block-ui/block-ui.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SignInFormModel } from './models/sign-in-form.model';

@Component({
    selector: 'app-sign-in-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: './sign-in-form.component.html',
    styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
    protected readonly formGroup: FormGroup<{ [K in keyof SignInFormModel]: FormControl<SignInFormModel[K]> }>;

    constructor(private readonly _destroyRef: DestroyRef
        , private readonly _authService: AuthService
        , private readonly _blockUiService: BlockUiService
        , private readonly _router: Router
        , private readonly _formBuilder: FormBuilder) {
        this.formGroup = this.#returnFormGroup();
    }

    submitForm() {
        const signInFormData = this.formGroup.getRawValue();
        this._blockUiService.block();
        this._authService.signIn(signInFormData).pipe(takeUntilDestroyed(this._destroyRef))
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