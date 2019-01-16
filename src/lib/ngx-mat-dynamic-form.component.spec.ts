import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatDynamicFormComponent } from './ngx-mat-dynamic-form.component';

describe('NgxMatDynamicFormComponent', () => {
  let component: NgxMatDynamicFormComponent;
  let fixture: ComponentFixture<NgxMatDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
