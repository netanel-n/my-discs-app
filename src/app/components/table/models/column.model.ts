export class ColumnModel {
    name: string;
    key: string;

    constructor(param: Partial<ColumnModel>) {
        this.name = param.name || '';
        this.key = param.key || '';
    }
}