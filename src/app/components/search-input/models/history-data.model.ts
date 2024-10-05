import { HistoryItemModel } from './history-item.model';

export class HistoryDataModel {
    /** For debugging purposes. For this demo only. */
    lastID = -1;
    lastIndexHead = -1;
    data: HistoryItemModel[] = [];
}