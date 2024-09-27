import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class UserDetailsService {
    constructor() { }

    /**
     * This is a basic, but a good implementation.
     * There are more cases, which will fail.. I will need a little bit more time..
     */
    emailValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            /** True: if email is valid, False: if not. */
            const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value);
            return !email ? { email: { msg: 'The Email is invalid.' } } : null;
        };
    }

    onlyEnglishCharsAndNumbersValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            /** True: if onlyEnglishCharsAndNumbers, False: if not. */
            const onlyEnglishCharsAndNumbers = /^[A-Za-z0-9]*$/.test(control.value);
            if (onlyEnglishCharsAndNumbers) return null;
            return { onlyEnglishCharsAndNumbers: { msg: 'Must accept only English characters and numbers.' } };
        };
    }

    isFirstCharNotANumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            /** True: if not begins with a number, False: if begins with a number. */
            const isFirstCharNotANumber = /^\D/.test(control.value);
            if (isFirstCharNotANumber) return null;
            return { isFirstCharNotANumber: { msg: 'First character must be not a number.' } };
        };
    }

    /** Will validate: At least one english uppercase And at least one number And no spaces. */
    atLeastOneEngUppercaseAndAtLeastOneNumberAndNoSpacesValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            /** True: if have AtLeastOneEngUppercase + AtLeastOneNumeber + NoSpaces, False: if not. */
            const atLeastOneEngUppercaseAndAtLeastOneNumberAndNoSpaces = /^(?=.*[A-Z])(?=.*\d)(?!.*\s)[A-Za-z\d]+$/
                .test(control.value);
            if (atLeastOneEngUppercaseAndAtLeastOneNumberAndNoSpaces) return null;

            const returnValue = {
                atLeastOneEngUppercaseAndAtLeastOneNumberAndNoSpaces: {
                    msg: 'At least one English uppercase And at least one number And no spaces.'
                }
            };
            return returnValue;
        };
    }
}