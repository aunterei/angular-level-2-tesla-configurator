import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { configuratorOptionsGuard } from './configurator-options.guard';

describe('configuratorOptionsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => configuratorOptionsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
