import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserDetailsService } from './user-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-details',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.scss',
    providers: [UserDetailsService]
})
export class UserDetailsComponent {
    readonly formGroup: FormGroup<{
        email: FormControl<string>,
        username: FormControl<string>,
        password: FormControl<string>
    }>;

    constructor(private readonly _formBuilder: FormBuilder
        , private readonly _matSnackBar: MatSnackBar
        , private readonly _userDetailsService: UserDetailsService) {
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
            email: ['', [Validators.required, this._userDetailsService.emailValidator()]],
            username: ['', [
                Validators.required,
                this._userDetailsService.onlyEnglishCharsAndNumbersValidator(),
                this._userDetailsService.isFirstCharNotANumberValidator()
            ]],
            password: ['', [
                Validators.required,
                this._userDetailsService.atLeastOneEngUppercaseAndAtLeastOneNumberAndNoSpacesValidator()
            ]]
        });
    }
}