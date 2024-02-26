import { Component, computed, inject, Signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CarModel, CarColor } from '@types';
import { CarConfiguratorService } from '@features/configurator';
import { ImageContainerComponent } from '@shared';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss',
  imports: [AsyncPipe, JsonPipe, ImageContainerComponent, FormsModule],
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
