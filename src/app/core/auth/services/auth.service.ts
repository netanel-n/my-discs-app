import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { map, mergeMap, of, tap } from 'rxjs';
import { SpotifySignInResponseModel } from '../models/spotify-sign-in-response.model';
import { ISpotifySignInResponse } from '../interfaces/spotify-sign-in-response.interface';
import { Params, Router } from '@angular/router';
import { SKIP_AUTH_VALIDATION } from '../context-tokens/context-tokens';
import { IdentityModel } from '../models/identity.model';
import { BlockUiService } from '../../../components/block-ui/block-ui.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    /** Embedded, for Security.
     * May\Might be in a global file. A configurable one.
     */
    get #AUTH_KEY() { return 'AUTH_KEY'; }

    constructor(private readonly _http: HttpClient
        , private readonly _router: Router
        , private readonly _blockUiService: BlockUiService
        , private readonly _storageService: StorageService) { }

    /** For a better security, And fast reaction, And less bug possibilities,
     * This is a method.
     */
    isSignedIn() {
        return this._storageService.get(this.#AUTH_KEY) !== null;
    }

    getSignedInInfoData() {
        return this._storageService.get<SpotifySignInResponseModel>(this.#AUTH_KEY);
    }

    /** A fake sign in. */
    signIn() {
        return of(true).pipe(mergeMap(() => this.signInToSpotify()));
    }

    signInToSpotify() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        /** ToDo: Put in a global Env file. */
        const body = 'grant_type=client_credentials&client_id=5c207a3a8a0c432dafcf89b21887b8ff&client_secret=16148abc24bb46a1addb9af6af5da963';
        const context = new HttpContext().set(SKIP_AUTH_VALIDATION, true);
        return this._http.post<ISpotifySignInResponse>('https://accounts.spotify.com/api/token', body, { headers, context })
            .pipe(map((spotifySignInResponse) => new SpotifySignInResponseModel(spotifySignInResponse))
                , tap(tokenData => {
                    this._storageService.set(this.#AUTH_KEY, tokenData);
                }));
    }

    /** A fake sign up. */
    signUp(identity: IdentityModel) {
        return of(true).pipe(mergeMap(() => this.signIn()));
    }

    signOut({ withNavigate = false, withReason = false, withUnBlockUi = false } = {}) {
        let queryParams: null | Params = null;

        this._storageService.remove(this.#AUTH_KEY);

        if (withUnBlockUi) {
            this._blockUiService.unBlock();
        }

        if (withNavigate) {
            if (withReason) queryParams = { reason: 'AUTO_SIGN_OUT' };
            this._router.navigate(['/landing-page'], { replaceUrl: true, queryParams });
        }

        return true;
    }
}