import { TestBed } from '@angular/core/testing';

import { TaskidService } from './taskid.service';

describe('TaskidService', () => {
  let service: TaskidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
