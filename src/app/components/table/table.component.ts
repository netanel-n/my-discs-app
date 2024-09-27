import { Component, computed, input, model, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ColumnModel } from './models/column.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationDataModel } from './models/pagination-data.model';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    host: {
        '[class.with-pagination]': 'withPagination()'
    }
})
export class TableComponent {
    withPagination = input(false);
    paginationData = input<null | PaginationDataModel>(null);
    rowIdProp = input.required<string>();
    columns = input.required<ColumnModel[]>();

    rowSelected = output<{ row: any, selectedRowId: null | string | number }>();

    dataSource = model.required<any[]>();

    columnsHeaders = computed(() => this.columns().map(x => x.key));

    selectedRowId: null | string | number = null;

    constructor() { }

    selectRow(row: any) {
        if (this.selectedRowId === row[this.rowIdProp()]) this.selectedRowId = null;
        else this.selectedRowId = row[this.rowIdProp()];
        this.rowSelected.emit({ row, selectedRowId: this.selectedRowId });
    }
}