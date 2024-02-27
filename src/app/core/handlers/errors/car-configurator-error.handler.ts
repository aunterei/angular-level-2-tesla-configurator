import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CarConfiguratorError } from './car-configurator.error';

@Injectable({
  providedIn: 'root',
})
export class CarConfiguratorErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error): void {
    const router: Router = this.injector.get(Router);

    if (error instanceof CarConfiguratorError) {
      router.navigateByUrl('/error');
    }
    throw error;
  }
}
