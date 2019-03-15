import {Component, Input, OnInit} from '@angular/core';
import {DynamicFormField} from './models';
import {FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';

@Component({
    selector: 'ngx-mat-dynamic-field',
    template: `
        <div *ngIf="show()" class="field-container" [style.width]="width()">
            <div class="field-class">
                <label [style.width]="labelWidth()"
                       [style.min-width]="labelWidth()">
                    {{label()}}
                </label>
                <span>
                <ng-template ngxMatDynamic [form]="form" [field]="field"></ng-template>
            </span>
            </div>
        </div>
    `,
    styles: [`
        /deep/ mat-form-field {
            height: 40px !important;
        }
        .field-container {
            display: inline-block;
        }
        .field-class {
            margin-top: 40px;
            place-items: center;
            display: flex;
        }
        label, /deep/ mat-checkbox, /deep/ mat-radio-button {
            padding-right: 10px;
            box-sizing: border-box;
            display: inline-block !important;
        }
        label {
            text-align: right;
        }
        span {
            flex: auto;
        }
    `]
})

export class NgxMatDynamicFieldComponent implements OnInit {
    @Input()
    field: DynamicFormField;

    @Input()
    form: FormGroup;

    constructor(private dynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
    }

    show() {
        return this.dynamicFormService.getValue(this.field, 'show', true);
    }

    labelWidth() {
        return this.dynamicFormService.getValue(this.field, 'labelWidth', '20%');
    }

    width() {
        return this.dynamicFormService.getValue(this.field, 'width', '100%');
    }

    label() {
        return this.dynamicFormService.getValue(this.field, 'label', '');
    }
}
