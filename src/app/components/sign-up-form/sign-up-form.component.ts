import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SignUpFormService } from './sign-up-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpFormModel } from './models/sign-up-form.model';

@Component({
    selector: 'app-sign-up-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: './sign-up-form.component.html',
    styleUrl: './sign-up-form.component.scss',
    providers: [SignUpFormService]
})
export class SignUpFormComponent {
    protected readonly formGroup: FormGroup<{ [K in keyof SignUpFormModel]: FormControl<SignUpFormModel[K]> }>;

    constructor(private readonly _formBuilder: FormBuilder
        , private readonly _matSnackBar: MatSnackBar
        , private readonly _signUpFormService: SignUpFormService) {
        this.formGroup = this.#returnFormGroup();
    }

    /** ToDo: If successful, navigate into Home Page.
     * Store in localStorage. A use in a `cookie` can be made, if we have a BackEnd.
     * Put in `auth.service.ts` file.
     */
    submitForm() {
        this.formGroup.reset();
        this._matSnackBar.open('Done!', 'Quit');
    }

    #returnFormGroup() {
        return this._formBuilder.nonNullable.group({
            email: ['', [Validators.required, this._signUpFormService.emailValidator()]],
            username: ['', [
                Validators.required,
                this._signUpFormService.onlyEnglishCharsAndNumbersValidator(),
                this._signUpFormService.isFirstCharNotANumberValidator()
            ]],
            password: ['', [
                Validators.required,
                this._signUpFormService.atLeastOneEngUppercaseAndAtLeastOneNumberAndNoSpacesValidator()
            ]]
        });
    }
}