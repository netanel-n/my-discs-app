import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '@spotify/web-api-ts-sdk';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscPageResolveService {
    constructor(private readonly _http: HttpClient
        , private readonly _datePipe: DatePipe) { }

    getById(id: string) {
        /** ToDo: Verify if I can use `/v1/search/` instead of `/v1/albums/`.
         * Put URL in a config file.
         * And define `dd/MM/yyyy` in global.
         */
        return this._http.get<Album>('https://api.spotify.com/v1/albums/' + id)
            .pipe(map(x => {
                return { ...x, release_date: this._datePipe.transform(x.release_date, 'dd/MM/yyyy')! };
            }));;
    }
}