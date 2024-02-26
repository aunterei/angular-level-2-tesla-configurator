import { CanActivateFn, Router } from '@angular/router';
import { CarConfiguratorService } from '@features/configurator';
import { inject } from '@angular/core';

export const summaryGuard: CanActivateFn = (route, state) => {
  const carConfiguratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );

  const router: Router = inject(Router);

  return carConfiguratorService.isConfigSelected()
    ? true
    : router.createUrlTree(['']);
};
