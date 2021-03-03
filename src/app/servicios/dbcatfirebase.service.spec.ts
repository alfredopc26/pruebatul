import { TestBed } from '@angular/core/testing';

import { DbcatfirebaseService } from './dbcatfirebase.service';

describe('DbcatfirebaseService', () => {
  let service: DbcatfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbcatfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
