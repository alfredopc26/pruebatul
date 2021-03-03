import { TestBed } from '@angular/core/testing';

import { DbcartfirebaseService } from './dbcartfirebase.service';

describe('DbcartfirebaseService', () => {
  let service: DbcartfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbcartfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
