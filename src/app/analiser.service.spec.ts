import { TestBed } from '@angular/core/testing';

import { AnaliserService } from './analiser.service';

describe('AnaliserService', () => {
  let service: AnaliserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaliserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
