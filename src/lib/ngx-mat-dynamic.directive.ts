import {ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicFormField, FormControlComponent} from './models';
import {NgxMatDynamicFormService} from './ngx-mat-dynamic-form.service';

@Directive({
    selector: '[ngxMatDynamic]'
})
export class NgxMatDynamicDirective implements OnInit {

    @Input()
    form: FormGroup;
    @Input()
    field: DynamicFormField;

    constructor(public viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private ngxMatDynamicFormService: NgxMatDynamicFormService) { }
    ngOnInit(): void {
        this.field.formControls.forEach(control => {
            this.ngxMatDynamicFormService.transform(this.form, control).forEach((formControl) => {
                const inputComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
                    <Type<FormControlComponent>>formControl.type);
                const componentRef = this.viewContainerRef.createComponent(inputComponentFactory);
                componentRef.instance.formControl = formControl as any;
                componentRef.instance.form = this.form;
            });
        });
    }

}
