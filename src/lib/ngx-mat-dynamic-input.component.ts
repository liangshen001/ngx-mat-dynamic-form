import {Component, Input, OnInit} from '@angular/core';
import {FormControlComponent, InputFormControl} from './models';
import {ControlValueAccessor, FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';

@Component({
    selector: 'ngx-mat-dynamic-input',
    template: `
        <mat-form-field *ngIf="show()"
                        [style.width]="width()"
                        [formGroup]="form">
            <ng-container *ngIf="formControl.options">
                <input matInput [placeholder]="placeholder()"
                       (change)="formControl.change && formControl.change($event)"
                       [formControlName]="formControl.name"
                       [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete"
                                  (optionSelected)="formControl.optionSelected && formControl.optionSelected($event)">
                    <mat-option *ngFor="let option of options()"
                                [value]="option.value">
                        {{ option.viewValue }}
                    </mat-option>
                </mat-autocomplete>
            </ng-container>
            <ng-container *ngIf="!formControl.options">
                <input matInput [placeholder]="placeholder()"
                       [formControlName]="formControl.name" (change)="formControl.change && formControl.change($event)">
            </ng-container>
        </mat-form-field>
    `
})

export class NgxMatDynamicInputComponent implements OnInit, FormControlComponent {

    formControl: InputFormControl;

    form: FormGroup;

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }

    show() {
        return this.dynamicFormService.getValue(this.formControl, 'show', true);
    }

    width() {
        return this.dynamicFormService.getValue(this.formControl, 'width', '80%');
    }

    placeholder() {
        return this.dynamicFormService.getValue(this.formControl, 'placeholder', '');
    }

    options() {
        return this.dynamicFormService.getValue(this.formControl, 'options', []);
    }
}
