import { TestBed } from '@angular/core/testing';

import { DbfirebaseService } from './dbfirebase.service';

describe('DbfirebaseService', () => {
  let service: DbfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
