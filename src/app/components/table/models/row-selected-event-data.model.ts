export class RowSelectedEventData<T> {
    row!: T;
    selectedRowId: null | number | string = null;
}