import { CarColor } from './car-color';
import { CarOptionBase } from './car-option-base';

export interface CarModel extends CarOptionBase {
  colors: CarColor[];
}
