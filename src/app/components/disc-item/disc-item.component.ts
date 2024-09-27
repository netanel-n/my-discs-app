import { Component, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-disc-item',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink],
    templateUrl: './disc-item.component.html',
    styleUrl: './disc-item.component.scss'
})
export class DiscItemComponent {
    id = input.required<number>();
    formData = input.required<{ id: number, title: string }>();

    protected readonly formGroup: FormGroup<{
        id: FormControl<number>,
        title: FormControl<string>
    }>;

    constructor(private readonly _formBuilder: FormBuilder) {
        this.formGroup = this.#returnFormGroup();
    }

    #returnFormGroup() {
        return this._formBuilder.nonNullable.group({
            id: [-1, Validators.required],
            title: ['', Validators.required]
        });
    }
}