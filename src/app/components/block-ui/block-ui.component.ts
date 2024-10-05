import { Component, input } from '@angular/core';

@Component({
    selector: 'app-block-ui',
    standalone: true,
    template: 'Please wait...',
    styleUrl: './block-ui.component.scss',
    host: {
        'role': 'progressbar',
        '[style.display]': 'isVisible() ? "grid" : "none"'
    }
})
export class BlockUiComponent {
    isVisible = input.required<boolean>();
}