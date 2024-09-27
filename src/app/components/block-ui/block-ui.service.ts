import { ApplicationRef, Injectable, ViewContainerRef } from '@angular/core';
import { BlockUiComponent } from './block-ui.component';

@Injectable({ providedIn: 'root' })
export class BlockUiService {
    #isReady = false;
    #isVisible = false;
    #componentRef: null | BlockUiComponent = null;
    #applicationMainViewContainerRef: null | ViewContainerRef = null;

    constructor(private readonly _applicationRef: ApplicationRef) { }

    block() {

    }

    unBlock() {

    }
}