import {Injectable} from '@angular/core';
import {Function} from 'estree';
import {CustomFormControl, FormControl} from './models';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NgxMatDynamicFormService {

    constructor() { }

    getValue(obj: any, fieldName: string, defaultValue: any, params?: any[]) {
        if (obj[fieldName]) {
            if (obj[fieldName] instanceof Function) {
                return obj[fieldName](params);
            }
            return obj[fieldName];
        }
        return defaultValue;
    }

    transform(form: FormGroup, control: FormControl | CustomFormControl): FormControl[] {
        if (control instanceof FormControl) {
            return [control];
        } else {
            return control.translate(form);
        }
    }

    markAllTouched(control: AbstractControl) {
        control.markAsTouched();
        if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach(key => this.markAllTouched(control.controls[key]));
        }
    }
}
