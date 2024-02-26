import { Component, computed, inject, Signal } from '@angular/core';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { ModelConfig, CarModel, CarColor } from '@types';
import { CarConfiguratorService } from '@features/configurator';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe, NgOptimizedImage],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );

  protected configDescription: Signal<string> = computed<string>(() => {
    const selectedConfig: ModelConfig =
      this.configuratorService.selectedConfig();

    return `Range: ${selectedConfig.range} miles - Max speed: ${selectedConfig.speed}`;
  });

  private selectedModel: Signal<CarModel> = computed(() => {
    const selected: CarModel | undefined = this.configuratorService
      .allCarModels()
      .find(
        (model: CarModel) =>
          model.code === this.configuratorService.carModelCode(),
      );
    if (!selected) {
      throw new Error();
    }

    return selected;
  });

  protected selectedColor: Signal<CarColor> = computed(() => {
    const selected: CarColor | undefined = this.selectedModel().colors.find(
      (color: CarColor) =>
        color.code === this.configuratorService.carColorCode(),
    );

    if (!selected) {
      throw new Error();
    }

    return selected;
  });

  protected totalCost: Signal<number> = computed<number>(
    () =>
      this.configuratorService.selectedConfig().price +
      this.selectedColor().price +
      (this.configuratorService.towHitch() ? 1000 : 0) +
      (this.configuratorService.yokeSteering() ? 1000 : 0),
  );
}
