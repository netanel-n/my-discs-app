import { Component, computed, input, signal } from '@angular/core';
import { ColumnModel } from './models/column.model';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [NgComponentOutlet],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    host: {
        'role': 'table',
        '[style.--height]': 'height()',
        '[style.--row-height]': 'rowHeight()',
        '[style]': '{"grid-template-columns": gridTemplateColumns()}'
    }
})
export class TableComponent {
    virtualScrollConfig = input<{ rowsCount: number }>(); // ToDo: Reset `scrollTop` + `virtualScrollState`.
    height = input.required<string>();
    rowHeight = input.required<string>();
    rowIdProp = input.required<string>();
    columns = input.required<ColumnModel[]>();
    dataSource = input.required<any[]>();

    virtualScrollState = signal({ startIndex: 0, paddingTop: 0 });

    rowHeightInPx = computed(() => +this.rowHeight().replace(/px$/i, ''));
    realNonVirtualHeight = computed(() => this.dataSource().length * this.rowHeightInPx());
    viewSource = computed(() => this.computedViewSourceFn());
    gridTemplateColumns = computed(() => `repeat(${this.columns().length}, 1fr)`);

    constructor() { }

    computedViewSourceFn() {
        const dataSource = this.dataSource();
        if (!dataSource.length) return [];
        const viewSource = [];
        const startIndex = this.virtualScrollState().startIndex;
        const endIndex = startIndex + this.virtualScrollConfig()!.rowsCount;
        for (let i = this.virtualScrollState().startIndex; i < endIndex; i++) {
            if (!dataSource[i]) continue;
            viewSource.push(dataSource[i]);
        }
        return viewSource;
    }

    onScroll(event: Event) {
        const htmlElement = event.target as HTMLElement;
        const scrollTop = htmlElement.scrollTop;
        const startIndex = Math.trunc(scrollTop / this.rowHeightInPx());
        this.virtualScrollState.set(({ startIndex, paddingTop: scrollTop }));
    }
}