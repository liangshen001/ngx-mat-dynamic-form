import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControlComponent, InputFormControl} from './models';
import {ControlValueAccessor, FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';
import {MatInput} from '@angular/material';

@Component({
    selector: 'ngx-mat-dynamic-textarea',
    template: `
        <mat-form-field *ngIf="show()"
                        [style.width]="width()"
                        [formGroup]="form">
                <textarea matInput [placeholder]="placeholder()"
                       [formControlName]="formControl.name" (change)="formControl.change && formControl.change($event)">
                </textarea>
        </mat-form-field>
    `
})

export class NgxMatDynamicTextareaComponent implements OnInit, FormControlComponent {

    formControl: InputFormControl;

    form: FormGroup;

    @ViewChild(MatInput)
    matInput: MatInput;

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }

    show() {
        return this.dynamicFormService.getValue(this.formControl, 'show', true, [this.matInput, this.form]);
    }

    width() {
        return this.dynamicFormService.getValue(this.formControl, 'width', '80%', [this.matInput, this.form]);
    }

    placeholder() {
        return this.dynamicFormService.getValue(this.formControl, 'placeholder', '', [this.matInput, this.form]);
    }
}
