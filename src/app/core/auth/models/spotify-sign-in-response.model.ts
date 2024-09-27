import { ISpotifySignInResponse } from '../interfaces/spotify-sign-in-response.interface';

export class SpotifySignInResponseModel {
    accessToken = '';
    tokenType = '';
    expiresIn = -1;

    /** For Refresh + Auto sign out. */
    dateTimeGenerated = new Date();

    constructor(value: ISpotifySignInResponse) {
        this.accessToken = value.access_token;
        this.tokenType = value.token_type;
        this.expiresIn = value.expires_in;
    }
}