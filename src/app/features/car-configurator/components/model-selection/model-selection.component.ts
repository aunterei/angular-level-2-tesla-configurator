import { Component, computed, inject, Signal } from '@angular/core';
import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarModel, CarColor } from '@types';
import { CarConfiguratorService } from '@features/configurator';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss',
  imports: [
    AsyncPipe,
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgOptimizedImage,
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

  protected carModelSelectionChange(newValue: string) {
    this.configuratorService.carModelCode.set(newValue);
    this.configuratorService.carColorCode.set(this.carColors()[0].code);
    this.configuratorService.resetOptions();
  }
}
