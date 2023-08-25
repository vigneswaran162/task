import { TestBed } from '@angular/core/testing';

import { EmployeemasterService } from './employeemaster.service';

describe('EmployeemasterService', () => {
  let service: EmployeemasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeemasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
