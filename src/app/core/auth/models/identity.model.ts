import { AccessToken } from '@spotify/web-api-ts-sdk';

export class IdentityModel {
    firstName = '';
    lastName = '';
    username: string;
    /** For Refresh + Auto sign out. */
    dateTimeSpotifyAccessTokenGenerated: Date;
    spotifyAccessToken: null | AccessToken;

    constructor(param: Partial<IdentityModel> = {}) {
        this.username = param.username || '';
        this.dateTimeSpotifyAccessTokenGenerated = param.dateTimeSpotifyAccessTokenGenerated || new Date();
        this.spotifyAccessToken = param.spotifyAccessToken || null;
    }
}