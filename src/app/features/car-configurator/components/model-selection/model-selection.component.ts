import { Component, computed, inject, Signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CarModel, CarColor, SelectOptions } from '@types';
import { CarConfiguratorService } from '@features/configurator';
import { ImageContainerComponent, SelectComponent } from '@shared';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss',
  imports: [
    AsyncPipe,
    JsonPipe,
    ImageContainerComponent,
    FormsModule,
    SelectComponent,
  ],
})
export class ModelSelectionComponent {
  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );

  protected carColors: Signal<CarColor[]> = computed((): CarColor[] => {
    const selectedModel: CarModel | undefined = this.configuratorService
      .allCarModels()
      .find(
        (model: CarModel) =>
          model.code === this.configuratorService.carModelCode(),
      );
    return selectedModel ? selectedModel.colors : [];
  });

  protected colorSelectOptions: SelectOptions<CarColor> = {
    id: 'colorSelect',
    label: 'Color:',
    options: this.carColors,
    trackBy: (color: CarColor) => color.code,
    optionLabelKey: 'description',
    optionValueKey: 'code',
  };

  protected modelSelectOptions: SelectOptions<CarModel> = {
    id: 'modelSelect',
    label: 'Model:',
    options: this.configuratorService.allCarModels,
    trackBy: (model: CarModel) => model.code,
    optionLabelKey: 'description',
    optionValueKey: 'code',
  };

  protected carModelSelectionChange(newValue: string) {
    this.configuratorService.carModelCode.set(newValue);
    this.configuratorService.carColorCode.set(this.carColors()[0].code);
    this.configuratorService.resetOptions();
  }
}
