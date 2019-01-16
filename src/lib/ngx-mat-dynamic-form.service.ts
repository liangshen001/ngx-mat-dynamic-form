import {Injectable} from '@angular/core';
import {Function} from 'estree';
import {ControlTranslate, CustomFormControl, FormControl} from './models';
import {FormGroup} from '@angular/forms';
import {NgxMatDynamicSelectComponent} from './ngx-mat-dynamic-select.component';
import {NgxMatDynamicCheckboxComponent} from './ngx-mat-dynamic-checkbox.component';
import {NgxMatDynamicInputComponent} from './ngx-mat-dynamic-input.component';
import {NgxMatDynamicRadioComponent} from './ngx-mat-dynamic-radio.component';

@Injectable({
  providedIn: 'root'
})
export class NgxMatDynamicFormService {

    componentTypes = [
        NgxMatDynamicSelectComponent,
        NgxMatDynamicCheckboxComponent,
        NgxMatDynamicInputComponent,
        NgxMatDynamicRadioComponent
    ];

    constructor() { }

    getValue(obj: any, fieldName: string, defaultValue: any) {
        if (obj[fieldName]) {
            if (obj[fieldName] instanceof Function) {
                return obj[fieldName]();
            }
            return obj[fieldName];
        }
        return defaultValue;
    }

    transform(form: FormGroup, control: FormControl | CustomFormControl): FormControl[] {
        const isNonCustom = this.componentTypes.some(type => control.type === type);
        if (isNonCustom) {
            return [<FormControl>control];
        } else {
            return (<ControlTranslate<CustomFormControl>>control.type)(form, <CustomFormControl>control);
        }
    }
}
