import { Component, computed, input, model, output, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ColumnModel } from './models/column.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationDataModel } from './models/pagination-data.model';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, NgComponentOutlet],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    host: {
        '[class.with-pagination]': 'withPagination()'
    }
})
export class TableComponent {
    hidePageSize = input<boolean>();
    withPagination = input<boolean>();
    paginationData = input<null | PaginationDataModel>();
    length = input<number>();
    rowIdProp = input.required<string>();
    columns = input.required<ColumnModel[]>();

    rowSelected = output<{ row: any, selectedRowId: null | string | number }>();
    pageSelected = output<PageEvent>();

    dataSource = model.required<any[]>();

    columnsHeaders = computed(() => this.columns().map(x => x.key));

    selectedRowId = signal<null | string | number>(null);

    constructor() { }

    /** ToDo: OnOffSwitch. */
    selectRow(row: any) {
        return;
        if (this.selectedRowId === row[this.rowIdProp()]) this.selectedRowId.set(null);
        else this.selectedRowId = row[this.rowIdProp()];
        this.rowSelected.emit({ row, selectedRowId: this.selectedRowId() });
    }
}