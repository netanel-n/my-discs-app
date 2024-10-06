import { Component, input } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { ColumnModel } from '../table/models/column.model';
import { CellContentType_ComponentByPropModel } from '../table/models/cell-content-type_component-by-prop.model';
import { DiscListItemComponent } from '../disc-list-item/disc-list-item.component';
import { DataReceivedModel } from '../search-input/models/data-received.model';

@Component({
    selector: 'app-disc-list',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './disc-list.component.html',
    styleUrl: './disc-list.component.scss'
})
export class DiscListComponent {
    receivedData = input.required<DataReceivedModel>();

    protected readonly columns = [
        new ColumnModel({
            name: 'Name', key: 'name',
            cellContentType: new CellContentType_ComponentByPropModel({ componentTypeRef: DiscListItemComponent })
        }),
        new ColumnModel({
            name: 'Image', key: 'images',
            cellContentType: new CellContentType_ComponentByPropModel({ componentTypeRef: DiscListItemComponent })
        }),
        new ColumnModel({
            name: 'Release Date', key: 'release_date',
            cellContentType: new CellContentType_ComponentByPropModel({ componentTypeRef: DiscListItemComponent })
        }),
        new ColumnModel({
            name: '', key: 'id',
            cellContentType: new CellContentType_ComponentByPropModel({ componentTypeRef: DiscListItemComponent })
        })
    ];
}