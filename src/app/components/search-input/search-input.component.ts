import { Component, DestroyRef, input, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SearchInputService } from './search-input.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BlockUiService } from '../block-ui/block-ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { DataReceivedModel } from './models/data-received.model';

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatSelectModule, DatePipe],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    providers: [SearchInputService]
})
export class SearchInputComponent {
    pageNum = input.required<number>();
    pageLength = input.required<number>();

    dataReceived = output<DataReceivedModel>();

    #id = 0; // First item will be `1`.
    #indexHead = -1;
    historyQueue = signal<{ id: number, value: string, dateTime: Date }[]>([]);

    readonly formGroupFindByDiscName: FormGroup<{ discName: FormControl<string> }>;
    readonly formGroupFindByHistory: FormGroup<{ discName: FormControl<string> }>;

    constructor(private readonly _searchInputService: SearchInputService
        , private readonly _blockUiService: BlockUiService
        , private readonly _destroyRef: DestroyRef
        , private readonly _formBuilder: FormBuilder) {
        this.formGroupFindByDiscName = this.#returnFormGroupFindByDiscName();
        this.formGroupFindByHistory = this.#returnFormGroupFindByHistory();
    }

    submitFormFindByDiscName(discName = '') {
        const discNameToSearch = discName || this.formGroupFindByDiscName.value.discName!;
        if (!discName) this.#addToHistory();
        this._blockUiService.block();
        this._searchInputService.findDiscs(discNameToSearch, 1, this.pageLength())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(x => {
                // ToDo: Put `emit` in a pipe.
                this.dataReceived.emit(new DataReceivedModel({
                    data: x.albums.items,
                    pageNum: this.pageNum(),
                    length: x.albums.total,
                    pageLength: this.pageLength()
                }));

                this._blockUiService.unBlock();
            });
    }

    submitFormFindByHistory() {
        this.submitFormFindByDiscName(this.formGroupFindByHistory.value.discName);
    }

    #returnFormGroupFindByDiscName() {
        return this._formBuilder.nonNullable.group({
            discName: ['', [
                Validators.required, this._searchInputService.isEmptyValidator()
            ]]
        });
    }

    #returnFormGroupFindByHistory() {
        return this._formBuilder.nonNullable.group({
            discName: ['', [
                Validators.required, this._searchInputService.isEmptyValidator()
            ]]
        });
    }

    /** ToDo: Make a common Service\DataStructure\Model.
     * TimeComplexity:Push=O(1), Swap=O(1) | SpaceComplexity:O(N=MAX_SIZE)
     * Implement a Symbol.iterator, For a sort ability.
     * In UI, instead of ReBuild all, Do a mutate - O(1).
     */
    #addToHistory() {
        /** Make configurable. */
        const MAX_SIZE = 5;
        const newItem = {
            id: ++this.#id,
            value: this.formGroupFindByDiscName.value.discName!,
            dateTime: new Date()
        };
        const historyQueue = this.historyQueue();

        if (this.historyQueue().length === MAX_SIZE) {
            const prevHead = this.#indexHead;
            historyQueue[prevHead % MAX_SIZE] = newItem;
            this.#indexHead += 1;
            return;
        }

        historyQueue.push(newItem);
        this.historyQueue.set(historyQueue);

        if (this.#indexHead === -1) this.#indexHead = 0;
    }
}