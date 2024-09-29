import { ApplicationRef, ComponentRef, Injectable, InputSignal, ViewContainerRef } from '@angular/core';
import { BlockUiComponent } from './block-ui.component';

const IS_VISIBLE_INPUT_NAME_KEY = 'isVisible'; // For assertion only.

@Injectable({ providedIn: 'root' })
export class BlockUiService {
    #isReady = false;
    #isVisible = false;
    #componentRef: null | ComponentRef<BlockUiComponent> = null;

    // For assertion only. ToDo: Improve...
    #isVisibleInputName: keyof BlockUiComponent = IS_VISIBLE_INPUT_NAME_KEY;
    #isVisibleInputType: null | BlockUiComponent[typeof IS_VISIBLE_INPUT_NAME_KEY]
        = null as null | InputSignal<boolean>;

    constructor(private readonly _applicationRef: ApplicationRef) { }

    block() {
        if (this.#isVisible) return;
        if (!this.#isReady) this.#init();
        this.#componentRef!.setInput(this.#isVisibleInputName, true);
        this.#isVisible = true;
    }

    unBlock() {
        if (!this.#isVisible) return;
        this.#componentRef!.setInput(this.#isVisibleInputName, false);
        this.#isVisible = false;
    }

    #init() {
        // ToDo: dynamic import.
        const applicationMainViewContainerRef = this._applicationRef.components[0].injector
            .get(ViewContainerRef);
        this.#componentRef = applicationMainViewContainerRef.createComponent(BlockUiComponent);
        this.#isReady = true;
    }
}