# ngx-mat-dynamic-form

Angular v6 component

Relying on the @angular/material


## Installation

`npm install --save ngx-mat-dynamic-form`

## Usage

html

```angular2html
<ngx-mat-dynamic-form [fields]="fields"></ngx-mat-dynamic-form>
<button (click)="submit()">提交</button>

```

ts
```
export class HomeComponent implements OnInit {
    @ViewChild(NgxMatDynamicFormComponent)
    dynamicForm: NgxMatDynamicFormComponent;

    // 学校 身份
    schoolIdentities = [{
        value: 0,
        viewValue: '班主任'
    }, {
        value: 1,
        viewValue: '老师'
    }, {
        value: 2,
        viewValue: '家长'
    }, {
        value: 3,
        viewValue: '学生'
    }];
    // 教授科目
    teachSubjects = [{
        value: 0,
        viewValue: '语文'
    }, {
        value: 1,
        viewValue: '数学'
    }, {
        value: 2,
        viewValue: '英语'
    }, {
        value: 3,
        viewValue: '美术'
    }, {
        value: 4,
        viewValue: '书法'
    }, {
        value: 5,
        viewValue: '音乐'
    }, {
        value: 6,
        viewValue: '物理'
    }, {
        value: 7,
        viewValue: '化学'
    }, {
        value: 8,
        viewValue: '地理'
    }, {
        value: 9,
        viewValue: '历史'
    }, {
        value: 10,
        viewValue: '政治'
    }, {
        value: 11,
        viewValue: '新增科目'
    }];
    // 家长身份
    patriarchTypes = [{
        value: 0,
        viewValue: '妈妈'
    }, {
        value: 1,
        viewValue: '爸爸'
    }, {
        value: 2,
        viewValue: '奶奶'
    }, {
        value: 3,
        viewValue: '爷爷'
    }, {
        value: 4,
        viewValue: '姐姐'
    }, {
        value: 5,
        viewValue: '哥哥'
    }, {
        value: 6,
        viewValue: '家长'
    }];
    // 规模人数
    scales = [{
        value: 0,
        viewValue: '100人'
    }, {
        value: 1,
        viewValue: '200人'
    }, {
        value: 2,
        viewValue: '500人'
    }, {
        value: 3,
        viewValue: '1000人'
    }];
    // 验证
    verifications = [{
        value: 0,
        viewValue: '允许任何人'
    }, {
        value: 1,
        viewValue: '需身份验证'
    }, {
        value: 2,
        viewValue: '不允许任何人'
    }];

    fields: DynamicFormField[] = [{
        label: '身份',
        width: () => this.dynamicForm.form.get('schoolIdentity').value === 3 ? '100%' : '43%',
        labelWidth: () => this.dynamicForm.form.get('schoolIdentity').value === 3 ? '20%' : '46%',
        formControls: [new SelectFormControl({
            name: 'schoolIdentity',
            options: this.schoolIdentities,
            validator: Validators.required,
            selectionChange: event => this.changeShcoolIdentity(event),
            value: 0,
            width: () => this.dynamicForm.form.get('schoolIdentity').value === 3 ? '80%' : '100%'
        })]
    }, {
        label: '教授科目',
        width: '40%',
        labelWidth: '40%',
        show: () => this.dynamicForm.form.get('schoolIdentity').value === 0 ||
            this.dynamicForm.form.get('schoolIdentity').value === 1,
        formControls: [new SelectInputFormControl({
            options: this.teachSubjects,
            width: '100%',
            validator: Validators.required,
            placeholder: '请选择教授科目',
            inputName: 'teachSubjectText',
            selectName: 'teachSubject',
            limitValue: 11
        })]
    }, {
        label: '你是孩子的',
        width: '40%',
        labelWidth: '40%',
        show: () => this.dynamicForm.form.get('schoolIdentity').value === 2,
        formControls: [new SelectFormControl({
            name: 'patriarchType',
            width: '100%',
            options: this.patriarchTypes,
            value: 0
        })]
    }, {
        label: '称呼',
        show: () => this.dynamicForm.form.get('schoolIdentity').value === 0 ||
            this.dynamicForm.form.get('schoolIdentity').value === 1,
        formControls: [new InputFormControl({
            name: 'appellation',
            validator: Validators.required,
            placeholder: '如：李老师'
        })]
    }, {
        label: '孩子姓名',
        show: () => this.dynamicForm.form.get('schoolIdentity').value === 2,
        formControls: [new InputFormControl({
            name: 'childName',
            placeholder: '开学登记的名字'
        })]
    }, {
        label: '真实姓名',
        show: () => this.dynamicForm.form.get('schoolIdentity').value === 3,
        formControls: [new InputFormControl({
            name: 'realName',
            placeholder: '请填写'
        })]
    }, {
        label: '群地点',
        formControls: [new InputFormControl({
            name: 'address',
            placeholder: '群地点'
        })]
    }, {
        label: '群名称',
        formControls: [new InputFormControl({
            name: 'name',
            validator: Validators.required,
            placeholder: '为你们的群起个给力的名称吧!'
        })]
    }, {
        label: '群规模',
        formControls: [new RadioFormControl({
            name: 'scale',
            value: 0,
            radioButtons: this.scales
        })]
    }, {
        label: '加群验证',
        formControls: [new RadioFormControl({
            name: 'verifications',
            value: 1,
            radioButtons: this.verifications
        })]
    }, {
        label: '群公开',
        formControls: [new CheckboxFormControl({
            name: 'allowVisit',
            text: '允许游客访问该群',
            change: event => {
                if (event.checked) {
                    this.dynamicForm.form.get('allowSpeak').enable();
                } else {
                    this.dynamicForm.form.get('allowSpeak').setValue(false);
                    this.dynamicForm.form.get('allowSpeak').disable();
                }
            }
        }), new CheckboxFormControl({
            name: 'allowSpeak',
            disabled: true,
            text: '允许游客发言'
        })]
    }];

    constructor() {}

    ngOnInit() {
    }
    /**
     * 家校师生 修改身份
     */
    changeShcoolIdentity(event: MatSelectChange) {
        switch (event.value) {
            case 0:
            case 1:
                this.dynamicForm.form.get('teachSubject').setValidators(Validators.required);
                this.dynamicForm.form.get('appellation').setValidators(Validators.required);
                this.dynamicForm.form.get('patriarchType').clearValidators();
                this.dynamicForm.form.get('childName').clearValidators();
                this.dynamicForm.form.get('realName').clearValidators();
                break;
            case 2:
                this.dynamicForm.form.get('teachSubject').clearValidators();
                this.dynamicForm.form.get('appellation').clearValidators();
                this.dynamicForm.form.get('patriarchType').setValidators(Validators.required);
                this.dynamicForm.form.get('childName').setValidators(Validators.required);
                this.dynamicForm.form.get('realName').clearValidators();
                break;
            case 3:
                this.dynamicForm.form.get('teachSubject').clearValidators();
                this.dynamicForm.form.get('appellation').clearValidators();
                this.dynamicForm.form.get('patriarchType').clearValidators();
                this.dynamicForm.form.get('childName').clearValidators();
                this.dynamicForm.form.get('realName').setValidators(Validators.required);
                break;
            default:
                break;
        }
    }

    submit() {
        this.dynamicForm.markAllTouched();
        if (this.dynamicForm.form.valid) {
        }
    }
}

```

## Support Form Type

* InputFormControl (support auto:  Specify Parameters 'options')
* CheckboxFormControl
* RadioFormControl
* SelectFormControl

## Support Custom Form 

* SelectInputFormControl (InputFormControl and SelectFormControl)


The implementation of SelectInputFormControl (extends CustomFormControl)

```

// 可以在以上组件基础上封装 自定义组件

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
```