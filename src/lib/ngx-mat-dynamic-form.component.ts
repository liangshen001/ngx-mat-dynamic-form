import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlTranslate, DynamicFormField} from './models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';

@Component({
    selector: 'ngx-mat-dynamic-form',
    template: `
        <form (submit)="submit.emit()" [formGroup]="form">
            <ng-container *ngFor="let field of fields">
                <ngx-mat-dynamic-field [field]="field"
                                       [form]="form"
                ></ngx-mat-dynamic-field>
            </ng-container>
        </form>
    `,
    styles: [`
        form {
            padding-bottom: 15px;
        }
    `]
})
export class NgxMatDynamicFormComponent implements OnInit {
    @Input()
    fields: DynamicFormField[];

    @Output()
    submit = new EventEmitter();

    form: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private ngxMatDynamicFormService: NgxMatDynamicFormService) {
    }

    ngOnInit() {
        const controlsConfig = {};

        this.fields.map(field => field.formControls)
            .forEach(controls => controls.forEach(control => {
                this.ngxMatDynamicFormService.transform(null, control)
                    .forEach(({name, value, disabled, validator}) =>
                    controlsConfig[name] = [{
                        value,
                        disabled
                    }, validator]);
            }));
        this.form = this.formBuilder.group(controlsConfig);
    }

}
