import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CheckboxFormControl, FormControlComponent} from './models';
import {FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';
import {MatCheckbox} from '@angular/material';

@Component({
    selector: 'ngx-mat-dynamic-checkbox',
    template: `
        <ng-container [formGroup]="form" *ngIf="show()">
            <mat-checkbox [formControlName]="formControl.name"
                          (change)="formControl.change && formControl.change($event)">
                {{text()}}
            </mat-checkbox>
        </ng-container>
    `
})

export class NgxMatDynamicCheckboxComponent implements OnInit, FormControlComponent {

    formControl: CheckboxFormControl;

    form: FormGroup;

    @ViewChildren(MatCheckbox)
    matCheckboxes: QueryList<MatCheckbox>;

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }



    show() {
        return this.dynamicFormService.getValue(this.formControl, 'show', true, [this.matCheckboxes, this.form]);
    }

    width() {
        return this.dynamicFormService.getValue(this.formControl, 'width', '70%', [this.matCheckboxes, this.form]);
    }

    placeholder() {
        return this.dynamicFormService.getValue(this.formControl, 'placeholder', '', [this.matCheckboxes, this.form]);
    }

    options() {
        return this.dynamicFormService.getValue(this.formControl, 'options', [], [this.matCheckboxes, this.form]);
    }

    text() {
        return this.dynamicFormService.getValue(this.formControl, 'text', '', [this.matCheckboxes, this.form]);
    }
}
