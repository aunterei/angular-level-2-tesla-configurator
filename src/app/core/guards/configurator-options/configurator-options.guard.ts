import { CanActivateFn, Router } from '@angular/router';
import { CarConfiguratorService } from '@features/configurator';
import { inject } from '@angular/core';

export const configuratorOptionsGuard: CanActivateFn = (route, state) => {
  const carConfiguratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );

  const router: Router = inject(Router);

  return carConfiguratorService.isModelSelected()
    ? true
    : router.createUrlTree(['']);
};
