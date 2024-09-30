import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

export class DataReceivedModel {
    /** How many rows found in API\BackEnd. */
    length: number;
    /** Which page was requested. */
    pageNum: number;
    /** How many rows in a page was requested. */
    pageLength: number;
    data: SimplifiedAlbum[];

    /** `Partial` is only for this demo. */
    constructor(param: Partial<DataReceivedModel>) {
        this.length = param.length ?? -1;
        this.pageNum = param.pageNum ?? -1;
        this.pageLength = param.pageLength ?? -1;
        this.data = param.data || [];
    }
}