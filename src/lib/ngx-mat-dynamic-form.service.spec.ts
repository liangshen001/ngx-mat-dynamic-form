import { TestBed } from '@angular/core/testing';

import { NgxMatDynamicFormService } from './ngx-mat-dynamic-form.service';

describe('NgxMatDynamicFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMatDynamicFormService = TestBed.get(NgxMatDynamicFormService);
    expect(service).toBeTruthy();
  });
});
