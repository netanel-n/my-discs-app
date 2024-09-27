import { Component, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SearchInputService } from './search-input.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BlockUiService } from '../block-ui/block-ui.service';

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    providers: [SearchInputService]
})
export class SearchInputComponent {
    dataReceived = output<[]>();

    historyQueue = signal<{ value: string, dateTime: Date }[]>([]);

    protected readonly formGroupFindByDiscName: FormGroup<{ discName: FormControl<string> }>;
    protected readonly formGroupFindByHistory: FormGroup<{ discName: FormControl<string> }>;

    constructor(private readonly _searchInputService: SearchInputService
        , private readonly _blockUiService: BlockUiService
        , private readonly _formBuilder: FormBuilder) {
        this.formGroupFindByDiscName = this.#returnFormGroupFindByDiscName();
        this.formGroupFindByHistory = this.#returnFormGroupFindByHistory();
    }

    submitFormFindByDiscName() {
        this._searchInputService.findDiscs(this.formGroupFindByDiscName.value.discName!).subscribe(x => {
            let i = 1;
        });
    }

    submitFormFindByHistory() {

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
}