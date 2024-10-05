export class HistoryItemModel {
    id: number;
    value: string;
    dateTime: Date;

    constructor(id: number, value: string) {
        this.id = id;
        this.value = value;
        this.dateTime = new Date();
    }
}