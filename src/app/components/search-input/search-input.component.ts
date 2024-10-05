import { Component, computed, DestroyRef, effect, input, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SearchInputService } from './search-input.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BlockUiService } from '../block-ui/block-ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DataReceivedModel } from './models/data-received.model';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { finalize } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { HistoryItemModel } from './models/history-item.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Params, Router } from '@angular/router';
import { HistoryDataModel } from './models/history-data.model';

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule,
        MatButtonToggleModule, DatePipe, DecimalPipe
    ],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    providers: [SearchInputService]
})
export class SearchInputComponent {
    get #HISTORY_KEY() { return 'HISTORY_KEY'; }

    withPagination = input<boolean>();

    dataReceived = output<DataReceivedModel>();

    formTypeId = model<'byName' | 'byHistory'>('byName');

    /** How many rows found in API\BackEnd. */
    length = signal(-1);
    /** Which page will be requested. */
    pageNum = signal(1);
    /** How many rows in a page will be requested. */
    pageLength = signal(50);
    data = signal(new Map<number, SimplifiedAlbum[]>());
    discNameToSearch = signal('');
    isFindHasBeenExecuted = signal(false);

    /** How many pages. */
    pageCount = computed(() => Math.ceil(this.length() / this.pageLength()));

    protected readonly historyQueue: ReturnType<typeof signal<HistoryDataModel>>;
    protected readonly formGroupFindByDiscName: FormGroup<{ discName: FormControl<string> }>;
    protected readonly formGroupFindByHistory: FormGroup<{ discName: FormControl<string> }>;

    constructor(private readonly _searchInputService: SearchInputService
        , private readonly _blockUiService: BlockUiService
        , private readonly _storageService: StorageService
        , private readonly _router: Router
        , private readonly _formBuilder: FormBuilder
        , private readonly _destroyRef: DestroyRef) {
        effect(() => this._storageService.set(this.#HISTORY_KEY, this.historyQueue()));
        const historyQueue = this._storageService.get<HistoryDataModel>(this.#HISTORY_KEY) || new HistoryDataModel();
        this.historyQueue = signal(historyQueue);

        this.formGroupFindByDiscName = this.#returnFormGroupFindByDiscName();
        this.formGroupFindByHistory = this.#returnFormGroupFindByHistory();
    }

    submitForm() {
        const discNameToSearch = this.formTypeId() === 'byName' ? this.formGroupFindByDiscName.getRawValue().discName
            : this.formGroupFindByHistory.getRawValue().discName;

        // Reset All
        this.pageNum.set(1);
        this.discNameToSearch.set(discNameToSearch);
        this.data.set(new Map<number, SimplifiedAlbum[]>());

        this.#addToUrl();
        if (this.formTypeId() === 'byName') this.#addToHistory();

        this.#retrieveData();
    }

    pageEvent(pageTypeId: 'prevPage' | 'nextPage') {
        this.pageNum.update(x => pageTypeId == 'prevPage' ? x - 1 : x + 1);

        if (this.data().has(this.pageNum())) { // Try get from in-memory.
            return this.dataReceived.emit(new DataReceivedModel({
                data: this.data().get(this.pageNum())
            }));
        }

        this.#retrieveData();
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

    #retrieveData() {
        this._blockUiService.block();
        this._searchInputService.getAll(this.discNameToSearch(), this.pageNum(), this.pageLength())
            .pipe(takeUntilDestroyed(this._destroyRef)
                /** `unBlock` should be in `finalize`, Also should create a blockUi interceptor. */
                , finalize(() => this._blockUiService.unBlock()))
            .subscribe(x => {
                this.length.set(x.albums.total);
                this.data.update(data => data.set(this.pageNum(), x.albums.items));
                this.isFindHasBeenExecuted.set(true);

                // ToDo: Put `emit` in a pipe.
                this.dataReceived.emit(new DataReceivedModel({ data: x.albums.items }));
            });
    }

    #addToUrl() {
        const queryParams: Params = { formTypeId: this.formTypeId(), value: this.discNameToSearch() };
        this._router.navigate([], { queryParams, replaceUrl: true });
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
        const historyQueue = this.historyQueue();
        const newItem = new HistoryItemModel(++historyQueue.lastID
            , this.formGroupFindByDiscName.getRawValue().discName);

        if (historyQueue.data.length === MAX_SIZE) {
            const prevHead = historyQueue.lastIndexHead;
            historyQueue.data[prevHead % MAX_SIZE] = newItem;
            historyQueue.lastIndexHead += 1;
            return this.historyQueue.set({ ...historyQueue });
        }

        historyQueue.data.push(newItem);
        if (historyQueue.lastIndexHead === -1) historyQueue.lastIndexHead = 0;
        this.historyQueue.set({ ...historyQueue });
    }
}