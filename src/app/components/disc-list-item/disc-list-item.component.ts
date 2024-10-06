import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColumnModel } from '../table/models/column.model';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

@Component({
    selector: 'app-disc-list-item',
    standalone: true,
    imports: [DatePipe, RouterLink],
    templateUrl: './disc-list-item.component.html',
    styleUrl: './disc-list-item.component.scss'
})
export class DiscListItemComponent {
    /** ToDo: Use an auto `Pick<...>`. */
    cellKey = input.required<'id' | 'name' | 'images' | 'release_date'>();
    rowData = input.required<SimplifiedAlbum>();
    columnData = input.required<ColumnModel>();
    cellData = input.required<any>();
}