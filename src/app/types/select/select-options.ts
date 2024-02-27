import { Signal } from '@angular/core';

export interface SelectOptions<T> {
  id: string;
  label: string;
  options: Signal<Array<T>>;
  trackBy: (element: T) => T[keyof T];
  optionValueKey: keyof T;
  optionLabelKey: keyof T;
}
