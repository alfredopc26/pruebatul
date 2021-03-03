import { TestBed } from '@angular/core/testing';

import { DbuserfirebaseService } from './dbuserfirebase.service';

describe('DbuserfirebaseService', () => {
  let service: DbuserfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbuserfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
