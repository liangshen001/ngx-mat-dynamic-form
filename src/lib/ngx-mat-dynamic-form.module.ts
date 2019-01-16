import {NgModule} from '@angular/core';
import {NgxMatDynamicFormComponent} from './ngx-mat-dynamic-form.component';
import {NgxMatDynamicInputComponent} from './ngx-mat-dynamic-input.component';
import {NgxMatDynamicSelectComponent} from './ngx-mat-dynamic-select.component';
import {NgxMatDynamicRadioComponent} from './ngx-mat-dynamic-radio.component';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMatDynamicCheckboxComponent} from './ngx-mat-dynamic-checkbox.component';
import {NgxMatDynamicFieldComponent} from './ngx-mat-dynamic-field.component';
import {NgxMatDynamicDirective} from './ngx-mat-dynamic.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatBadgeModule,
        MatAutocompleteModule
    ],
    declarations: [
        NgxMatDynamicFormComponent,
        NgxMatDynamicInputComponent,
        NgxMatDynamicSelectComponent,
        NgxMatDynamicRadioComponent,
        NgxMatDynamicCheckboxComponent,
        NgxMatDynamicFieldComponent,
        NgxMatDynamicDirective
    ],
    entryComponents: [
        NgxMatDynamicInputComponent,
        NgxMatDynamicSelectComponent,
        NgxMatDynamicRadioComponent,
        NgxMatDynamicCheckboxComponent
    ],
    exports: [
        NgxMatDynamicFormComponent,
        NgxMatDynamicInputComponent,
        NgxMatDynamicSelectComponent,
        NgxMatDynamicRadioComponent,
        NgxMatDynamicCheckboxComponent
    ]
})
export class NgxMatDynamicFormModule {
}
