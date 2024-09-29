import { Component, input } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { ColumnModel } from '../table/models/column.model';
import { Router } from '@angular/router';
import { RowSelectedEventData } from '../table/models/row-selected-event-data.model';

@Component({
    selector: 'app-disc-list',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './disc-list.component.html',
    styleUrl: './disc-list.component.scss'
})
export class DiscListComponent {
    dataSource = input.required<any[]>();

    readonly columns = [
        new ColumnModel({ name: 'Name', key: 'name' }),
        new ColumnModel({ name: 'Image', key: 'images' }),
        new ColumnModel({ name: 'Release Date', key: 'release_date' }),
    ];

    constructor(private readonly _router: Router) { }

    rowSelected({ row, selectedRowId }: RowSelectedEventData<any>) {
        this._router.navigate(['/disc', selectedRowId]);
    }
}