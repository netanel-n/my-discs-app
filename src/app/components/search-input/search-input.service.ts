import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class SearchInputService {
    constructor(private readonly _http: HttpClient) { }

    isEmptyValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            /** True: if value is with only spaces, False: if not. */
            const isEmpty = /^\s*$/.test(control.value);
            if (!isEmpty) return null;
            return { isEmpty: { msg: 'Must not be empty.' } };
        };
    }

    findDiscs(discName: string, pageNum = 0, pageLimit = 20) {
        const params = new HttpParams().set('q', discName)
            .set('type', 'album');

        return this._http.get('https://api.spotify.com/v1/search', { params });
    }
}