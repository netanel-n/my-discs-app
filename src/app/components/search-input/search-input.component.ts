import { Component, computed, DestroyRef, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SearchInputService } from './search-input.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BlockUiService } from '../block-ui/block-ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataReceivedModel } from './models/data-received.model';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatSelectModule, DatePipe, DecimalPipe],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    providers: [SearchInputService]
})
export class SearchInputComponent {
    withPagination = input<boolean>();

    dataReceived = output<DataReceivedModel>();

    /** How many rows found in API\BackEnd. */
    length = signal<number>(-1);
    /** Which page will be requested. */
    pageNum = signal<number>(1);
    /** How many rows in a page will be requested. */
    pageLength = signal<number>(50);
    data = signal<Map<number, SimplifiedAlbum[]>>(new Map<number, SimplifiedAlbum[]>());
    /** Bug: I need to store `this.submitFormFindByDiscName.value.discName`. */
    isFindHasBeenExecuted = signal<boolean>(false);
    /** How many pages. */
    pageCount = computed<number>(() => Math.ceil(this.length() / this.pageLength()));

    readonly formGroupFindByDiscName: FormGroup<{ discName: FormControl<string> }>;
    readonly formGroupFindByHistory: FormGroup<{ discName: FormControl<string> }>;

    #id = 0; // First item will be `1`.
    #indexHead = -1;
    historyQueue = signal<{ id: number, value: string, dateTime: Date }[]>([]);

    constructor(private readonly _searchInputService: SearchInputService
        , private readonly _blockUiService: BlockUiService
        , private readonly _destroyRef: DestroyRef
        , private readonly _formBuilder: FormBuilder) {
        this.formGroupFindByDiscName = this.#returnFormGroupFindByDiscName();
        this.formGroupFindByHistory = this.#returnFormGroupFindByHistory();
    }

    submitFormFindByDiscName(discName = '') {
        const discNameToSearch = discName || this.formGroupFindByDiscName.value.discName!;

        // Need to improve. Statement meaning: Event came from `submitFormFindByHistory`.
        if (!discName) this.#addToHistory();
        this._blockUiService.block();
        this._searchInputService.getAll(discNameToSearch, this.pageNum(), this.pageLength())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(x => {
                this.length.set(x.albums.total);
                this.data.update(data => data.set(this.pageNum(), x.albums.items));
                this.isFindHasBeenExecuted.set(true);

                // ToDo: Put `emit` in a pipe.
                this.dataReceived.emit(new DataReceivedModel({ data: x.albums.items }));

                this._blockUiService.unBlock();
            });
    }

    submitFormFindByHistory() {
        this.submitFormFindByDiscName(this.formGroupFindByHistory.value.discName);
    }

    /** Put common logic in a separate function. */
    prevPage() {
        this.pageNum.update(x => x - 1);

        // Use memory.
        if (this.data().has(this.pageNum())) {
            return this.dataReceived.emit(new DataReceivedModel({
                data: this.data().get(this.pageNum())!
            }));
        }

        this.submitFormFindByDiscName();
    }

    nextPage() {
        this.pageNum.update(x => x + 1);

        // Use memory.
        if (this.data().has(this.pageNum())) {
            return this.dataReceived.emit(new DataReceivedModel({
                data: this.data().get(this.pageNum())!
            }));
        }

        this.submitFormFindByDiscName();
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
     * This is a LinkedList mimic.
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