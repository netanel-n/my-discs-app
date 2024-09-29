import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Album, Page, SimplifiedArtist, SimplifiedTrack, Image as SpotifyImage } from '@spotify/web-api-ts-sdk';
import { BlockUiService } from '../block-ui/block-ui.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-disc-item',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
    templateUrl: './disc-item.component.html',
    styleUrl: './disc-item.component.scss'
})
export class DiscItemComponent implements OnInit {
    formData = input.required<Album>();

    readonly formGroup: FormGroup<{
        name: FormControl<string>,
        label: FormControl<string>,
        release_date: FormControl<string>,
        total_tracks: FormControl<number>
        artists: FormControl<SimplifiedArtist[]>,
        tracks: FormControl<Page<SimplifiedTrack>>,
        images: FormControl<SpotifyImage[]>
    }>;

    constructor(private readonly _formBuilder: FormBuilder
        , private readonly _blockUiService: BlockUiService) {
        this.formGroup = this.#returnFormGroup();
    }

    ngOnInit() {
        this.formGroup.patchValue(this.formData());
        this._blockUiService.unBlock();
    }

    #returnFormGroup() {
        const formGroup = this._formBuilder.nonNullable.group({
            name: '',
            label: '',
            release_date: '',
            total_tracks: -1,
            artists: [[] as SimplifiedArtist[]],
            tracks: {} as Page<SimplifiedTrack>,
            images: [[] as SpotifyImage[]]
        });

        // ToDo: Make a Directive and a common Service... And Revalidate + Improve...
        for (const control in formGroup.controls) {
            const abstractControl = formGroup.get(control)!;
            if (!Array.isArray(abstractControl.value) && typeof abstractControl.value != 'object') {
                abstractControl.disable();
            }
        }

        return formGroup;
    }
}