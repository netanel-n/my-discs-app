import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NewReleases } from '@spotify/web-api-ts-sdk';

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

    findDiscs(discName: string, pageNum: number, pageLimit: number) {
        const params = new HttpParams().set('q', discName)
            .set('limit', pageLimit)
            .set('offset', pageNum - 1)
            .set('type', 'album');

        // ToDo: Put URL in a config file.
        return this._http.get<NewReleases>('https://api.spotify.com/v1/search', { params });
    }
}