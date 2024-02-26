import { Routes } from '@angular/router';
import {
  ModelSelectionComponent,
  OptionsSelectionComponent,
  SummaryComponent,
} from '@features/configurator';
import {
  configuratorOptionsGuard,
  summaryGuard,
  NotFoundComponent,
} from '@core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'model-selection',
    pathMatch: 'full',
  },
  {
    path: 'model-selection',
    component: ModelSelectionComponent,
  },
  {
    path: 'options-selection',
    component: OptionsSelectionComponent,
    canActivate: [configuratorOptionsGuard],
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [summaryGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];
