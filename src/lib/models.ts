import {FormGroup, ValidatorFn} from '@angular/forms';
import {NgxMatDynamicSelectComponent} from './ngx-mat-dynamic-select.component';
import {Type} from '@angular/core';
import {NgxMatDynamicRadioComponent} from './ngx-mat-dynamic-radio.component';
import {NgxMatDynamicInputComponent} from './ngx-mat-dynamic-input.component';
import {NgxMatDynamicCheckboxComponent} from './ngx-mat-dynamic-checkbox.component';
import {MatRadioChange} from '@angular/material/radio/typings/radio';
import {MatAutocompleteSelectedEvent, MatCheckboxChange, MatInput, MatSelectChange} from '@angular/material';
import {NgxMatDynamicTextareaComponent} from './ngx-mat-dynamic-textarea.component';

export interface FormControlComponent {
    formControl: FormControl;
    form: FormGroup;
}

export type TypeOrTypeLike<T, R> = ((R) => T) | T;


export interface DynamicFormField {
    label: TypeOrTypeLike<string, any>;
    show?: TypeOrTypeLike<boolean, any>;
    width?: TypeOrTypeLike<string, any>;
    labelWidth?: TypeOrTypeLike<string, any>;
    formControls: (FormControl | CustomFormControl)[];
}

export abstract class FormControl {
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean, any>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    value?: any;
    get type() {
        return this._type;
    }
    protected constructor(private _type: any) {}
}

export interface RadioFormControlOptions {
    radioButtons: TypeOrTypeLike<{value, viewValue}[], any>;
    change?: (event: MatRadioChange) => void;
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean, any>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    value?: any;
}
export class RadioFormControl extends FormControl implements RadioFormControlOptions {
    radioButtons: TypeOrTypeLike<{ value; viewValue }[], any>;
    change?: (event: MatRadioChange) => void;
    constructor(options: RadioFormControlOptions) {
        super(NgxMatDynamicRadioComponent);
        Object.keys(options).forEach(key => this[key] = options[key]);
    }
}
export interface SelectFormControlOptions {
    options: TypeOrTypeLike<{value, viewValue}[], any>;
    selectionChange?: (event: MatSelectChange) => void;
    placeholder?: TypeOrTypeLike<string, any>;
    width?: TypeOrTypeLike<string, any>;
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean, any>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    value?: any;
}

export class SelectFormControl extends FormControl implements SelectFormControlOptions {
    options: TypeOrTypeLike<{value, viewValue}[], any>;
    selectionChange?: (event: MatSelectChange) => void;
    placeholder?: TypeOrTypeLike<string, any>;
    width?: TypeOrTypeLike<string, any>;
    constructor(options: SelectFormControlOptions) {
        super(NgxMatDynamicSelectComponent);
        Object.keys(options).forEach(key => this[key] = options[key]);
    }
}

export interface TextareaFormControlOptions {
    width?: TypeOrTypeLike<string, any>;
    placeholder?: TypeOrTypeLike<string, any>;
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean, [MatInput, FormGroup]>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    value?: string;
}

export class TextareaFormControl extends FormControl implements TextareaFormControlOptions {
    width?: TypeOrTypeLike<string, [MatInput, FormGroup]>;
    placeholder?: TypeOrTypeLike<string, [MatInput, FormGroup]>;
    value?: string;
    show?: TypeOrTypeLike<boolean, [MatInput, FormGroup]>;
    constructor(options: TextareaFormControlOptions) {
        super(NgxMatDynamicTextareaComponent);
        Object.keys(options).forEach(key => this[key] = options[key]);
    }
}

export interface InputFormControlOptions {
    options?: TypeOrTypeLike<{value, viewValue}[], any>;
    optionSelected?: (event: MatAutocompleteSelectedEvent) => void;
    width?: TypeOrTypeLike<string, any>;
    placeholder?: TypeOrTypeLike<string, any>;
    change?: (event) => void;
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean, [MatInput, FormGroup]>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    value?: string;
}

export class InputFormControl extends FormControl implements InputFormControlOptions {
    options?: TypeOrTypeLike<{value, viewValue}[], [MatInput, FormGroup]>;
    optionSelected?: (event: MatAutocompleteSelectedEvent) => void;
    width?: TypeOrTypeLike<string, [MatInput, FormGroup]>;
    placeholder?: TypeOrTypeLike<string, [MatInput, FormGroup]>;
    change?: (event) => void;
    value?: string;
    show?: TypeOrTypeLike<boolean, [MatInput, FormGroup]>;
    constructor(options: InputFormControlOptions) {
        super(NgxMatDynamicInputComponent);
        Object.keys(options).forEach(key => this[key] = options[key]);
    }
}

export interface CheckboxFormControlOptions {
    change?: (event: MatCheckboxChange) => void;
    text: TypeOrTypeLike<string, any>;
    value?: boolean;
    name: string;
    disabled?: boolean;
    show?: TypeOrTypeLike<boolean, any>;
    validator?: ValidatorFn | ValidatorFn[] | null;
}

export class CheckboxFormControl extends FormControl implements CheckboxFormControlOptions {
    change?: (event: MatCheckboxChange) => void;
    text: TypeOrTypeLike<string, any>;
    value?: boolean;
    constructor(options: CheckboxFormControlOptions) {
        super(NgxMatDynamicCheckboxComponent);
        Object.keys(options).forEach(key => this[key] = options[key]);
    }
}

export abstract class CustomFormControl {
    get translate(): ControlTranslate {
        return this._translate;
    }
    constructor(private _translate: ControlTranslate) {}
}

export type ControlTranslate = (form: FormGroup) => FormControl[];

// 可以在以上组件基础上封装 自定义组件

// 俩个表单项 一个select 一个input 定义接口
// 表示为一个select   选择项中有一项为可自定义输入项  点击后变为input可输入值 input可下拉之前的选项 点击选项切换为select
export class SelectInputFormControl extends CustomFormControl {
    constructor(options: SelectInputFormControlOptions) {
        super((form: FormGroup): FormControl[] => {
            return [new SelectFormControl({
                name: options.selectName,
                options: options.options,
                validator: options.validator,
                selectionChange: (event: MatSelectChange) => {
                    if (event.value === options.limitValue) {
                        form.get(options.inputName).setValidators(options.validator);
                    }
                    if (options.selectionChange) {
                        options.selectionChange(event);
                    }
                },
                placeholder: options.placeholder,
                width: options.width,
                show: () => form.get(options.selectName).value !== options.limitValue
            }), new InputFormControl({
                name: options.inputName,
                options: options.options instanceof Function ?
                        (params) => (<Function>options.options)(params).filter(option => option.value !== options.limitValue) :
                        options.options.filter(option => option.value !== options.limitValue),
                optionSelected: (event: MatAutocompleteSelectedEvent) => {
                    if (event.option.value !== options.limitValue) {
                        form.get(options.selectName).setValue(event.option.value);
                        form.get(options.inputName).setValue(null);
                        form.get(options.inputName).clearValidators();
                    }
                },
                width: options.width,
                change: options.change,
                placeholder: options.placeholder,
                show: ([input]: [MatInput]) => {
                    if (input) {
                        // input.focus();
                    }
                    return form.get(options.selectName).value === options.limitValue;
                }
            })];
        });
    }
}

export interface SelectInputFormControlOptions {
    options: TypeOrTypeLike<{value, viewValue}[], any>;
    selectionChange?: (event: MatSelectChange) => void;
    change?: (event) => void;
    limitValue: any;
    inputName: string;
    selectName: string;
    placeholder?: TypeOrTypeLike<string, any>;
    width?: TypeOrTypeLike<string, any>;
    validator?: ValidatorFn | ValidatorFn[] | null;
    value?: any;
}
