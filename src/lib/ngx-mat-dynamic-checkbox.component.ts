import {Component, OnInit} from '@angular/core';
import {CheckboxFormControl, FormControlComponent} from './models';
import {FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';

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

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }



    show() {
        return this.dynamicFormService.getValue(this.formControl, 'show', true);
    }

    width() {
        return this.dynamicFormService.getValue(this.formControl, 'width', '70%');
    }

    placeholder() {
        return this.dynamicFormService.getValue(this.formControl, 'placeholder', '');
    }

    options() {
        return this.dynamicFormService.getValue(this.formControl, 'options', []);
    }

    text() {
        return this.dynamicFormService.getValue(this.formControl, 'text', '');
    }
}
