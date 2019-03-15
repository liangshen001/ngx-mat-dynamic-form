import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControlComponent, RadioFormControl} from './models';
import {FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';
import {MatRadioButton} from '@angular/material';

@Component({
    selector: 'ngx-mat-dynamic-radio',
    template: `
        <ng-container [formGroup]="form" *ngIf="show()">
            <mat-radio-group [formControlName]="formControl.name">
                <mat-radio-button *ngFor="let radioButton of radioButtons()"
                                  [value]="radioButton.value"
                                  (change)="formControl.change && formControl.change($event)">
                    {{radioButton.viewValue}}
                </mat-radio-button>
            </mat-radio-group>
        </ng-container>
    `
})

export class NgxMatDynamicRadioComponent implements OnInit, FormControlComponent {

    formControl: RadioFormControl;

    form: FormGroup;

    @ViewChildren(MatRadioButton)
    matRadioButtons: QueryList<MatRadioButton>;

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }

    show() {
        return this.dynamicFormService.getValue(this.formControl, 'show', true, [this.matRadioButtons, this.form]);
    }

    width() {
        return this.dynamicFormService.getValue(this.formControl, 'width', '70%', [this.matRadioButtons, this.form]);
    }

    radioButtons() {
        return this.dynamicFormService.getValue(this.formControl, 'radioButtons', [], [this.matRadioButtons, this.form]);
    }

    transform() {
        return [this.formControl];
    }
}
