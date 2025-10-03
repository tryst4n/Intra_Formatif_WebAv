import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardTestGuard } from './guard-test.guard';

describe('guardTestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardTestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
