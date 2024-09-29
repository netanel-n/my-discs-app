import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

export class DataReceivedModel {
    /** How many rows found in API\BackEnd. */
    length: number;
    /** Which page was requested. */
    pageNum: number;
    /** How many rows in a page requested. */
    pageLength: number;
    data: SimplifiedAlbum[];

    constructor(param: DataReceivedModel) {
        this.length = param.length;
        this.pageNum = param.pageNum;
        this.pageLength = param.pageLength;
        this.data = param.data;
    }
}