import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControlComponent, SelectFormControl} from './models';
import {FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';
import {MatSelect} from '@angular/material';

@Component({
    selector: 'ngx-mat-dynamic-select',
    template: `
        <ng-container [formGroup]="form" *ngIf="show()">
            <mat-form-field [style.width]="width()">
                <mat-select #matSelect [placeholder]="placeholder()"
                            [formControlName]="formControl.name"
                            (selectionChange)="formControl.selectionChange && formControl.selectionChange($event)">
                    <mat-option *ngFor="let option of options()"
                                [value]="option.value">
                        {{option.viewValue}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </ng-container>
    `
})

export class NgxMatDynamicSelectComponent implements OnInit, FormControlComponent {

    formControl: SelectFormControl;
    form: FormGroup;

    @ViewChild(MatSelect)
    matSelect: MatSelect;

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }

    show() {
        return this.dynamicFormService.getValue(this.formControl, 'show', true, [this.matSelect, this.form]);
    }

    width() {
        return this.dynamicFormService.getValue(this.formControl, 'width', '80%', [this.matSelect, this.form]);
    }

    placeholder() {
        return this.dynamicFormService.getValue(this.formControl, 'placeholder', '', [this.matSelect, this.form]);
    }

    options() {
        return this.dynamicFormService.getValue(this.formControl, 'options', [], [this.matSelect, this.form]);
    }
}
