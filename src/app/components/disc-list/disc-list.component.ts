import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { ColumnModel } from '../table/models/column.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-disc-list',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './disc-list.component.html',
    styleUrl: './disc-list.component.scss'
})
export class DiscListComponent {
    columns: ColumnModel[] = [
        { name: 'Id', key: 'id' },
        { name: 'Name', key: 'name' },
        { name: 'Image', key: 'image' },
        { name: 'Release Date', key: 'dsa' }
    ];

    dataSource = [{
        id: 1,
        name: 'A',
        image: 'B',
        dateTime: new Date()
    },
    {
        id: 2,
        name: 'AA',
        image: 'BB',
        dateTime: new Date()
    },
    {
        id: 3,
        name: 'AAA',
        image: 'BBB',
        dateTime: new Date()
    }];

    constructor(private readonly _router: Router) {

    }

    rowSelected({ row, selectedRowId }: any) {
        this._router.navigate(['/disc', -1]);
    }
}