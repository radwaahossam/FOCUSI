import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { testDoneGuard } from './test-done.guard';

describe('testDoneGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => testDoneGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
