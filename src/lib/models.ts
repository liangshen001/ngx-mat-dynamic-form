import {FormGroup, ValidatorFn} from '@angular/forms';
import {NgxMatDynamicSelectComponent} from './ngx-mat-dynamic-select.component';
import {Type} from '@angular/core';
import {NgxMatDynamicRadioComponent} from './ngx-mat-dynamic-radio.component';
import {NgxMatDynamicInputComponent} from './ngx-mat-dynamic-input.component';
import {NgxMatDynamicCheckboxComponent} from './ngx-mat-dynamic-checkbox.component';
import {MatRadioChange} from '@angular/material/radio/typings/radio';
import {MatAutocompleteSelectedEvent, MatCheckboxChange, MatSelectChange} from '@angular/material';

export interface FormControlComponent {
    formControl: FormControl;
    form: FormGroup;
}

export type TypeOrTypeLike<T> = (() => T) | T;


export interface DynamicFormField {
    label: TypeOrTypeLike<string>;
    show?: TypeOrTypeLike<boolean>;
    width?: TypeOrTypeLike<string>;
    labelWidth?: TypeOrTypeLike<string>;
    formControls: (FormControl | CustomFormControl)[];
}

export interface FormControl {
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    type: Type<FormControlComponent>;
    value?: any;
}

export interface RadioFormControl extends FormControl {
    type: Type<NgxMatDynamicRadioComponent>;
    radioButtons: TypeOrTypeLike<{value, viewValue}[]>;
    change?: (event: MatRadioChange) => void;
}

export interface SelectFormControl extends FormControl {
    type: Type<NgxMatDynamicSelectComponent>;
    options: TypeOrTypeLike<{value, viewValue}[]>;
    selectionChange?: (event: MatSelectChange) => void;
    placeholder?: TypeOrTypeLike<string>;
    width?: TypeOrTypeLike<string>;
}

export interface InputFormControl extends FormControl {
    type: Type<NgxMatDynamicInputComponent>;
    options?: TypeOrTypeLike<{value, viewValue}[]>;
    optionSelected?: (event: MatAutocompleteSelectedEvent) => void;
    width?: TypeOrTypeLike<string>;
    placeholder?: TypeOrTypeLike<string>;
    change?: (event) => void;
    value?: string;
}

export interface CheckboxFormControl extends FormControl {
    type: Type<NgxMatDynamicCheckboxComponent>;
    change?: (event: MatCheckboxChange) => void;
    text: TypeOrTypeLike<string>;
    value?: boolean;
}

export interface CustomFormControl {
    type: ControlTranslate<CustomFormControl>;
}

export type ControlTranslate<T extends CustomFormControl> = (form: FormGroup, control: T) => FormControl[];

// 可以在以上组件基础上封装 自定义组件

// 俩个表单项 一个select 一个input 定义接口
// 表示为一个select   选择项中有一项为可自定义输入项  点击后变为input可输入值 input可下拉之前的选项 点击选项切换为select
export interface SelectInputFormControl extends CustomFormControl {
    type: ControlTranslate<SelectInputFormControl>;
    options: TypeOrTypeLike<{value, viewValue}[]>;
    selectionChange?: (event: MatSelectChange) => void;
    change?: (event) => void;
    limitValue: any;
    inputName: string;
    selectName: string;
    placeholder?: TypeOrTypeLike<string>;
    width?: TypeOrTypeLike<string>;
    validator?: ValidatorFn | ValidatorFn[] | null;
}

export const selectInputControlTranslate: ControlTranslate<SelectInputFormControl> =
    (form: FormGroup, control: SelectInputFormControl): FormControl[] => {
    return [<SelectFormControl>{
        name: control.selectName,
        type: NgxMatDynamicSelectComponent,
        options: control.options,
        validator: control.validator,
        selectionChange: (event: MatSelectChange) => {
            if (event.value === control.limitValue) {
                form.get(control.inputName).setValidators(control.validator);
            }
            if (control.selectionChange) {
                control.selectionChange(event);
            }
        },
        placeholder: control.placeholder,
        width: control.width,
        show: () => form.get(control.selectName).value !== control.limitValue
    }, <InputFormControl>{
        name: control.inputName,
        type: NgxMatDynamicInputComponent,
        options: control.options,
        optionSelected: (event: MatAutocompleteSelectedEvent) => {
            if (event.option.value !== control.limitValue) {
                form.get(control.selectName).setValue(event.option.value);
                form.get(control.inputName).setValue(null);
                form.get(control.inputName).clearValidators();
            }
        },
        width: control.width,
        change: control.change,
        placeholder: control.placeholder,
        show: () => form.get(control.selectName).value === control.limitValue
    }];
};
