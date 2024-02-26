import { Component, computed, inject, Signal } from '@angular/core';
import { CarConfiguratorService } from '@features/configurator';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelConfig } from '@types';
import { CarConfiguratorApiService } from '@apis';

@Component({
  selector: 'app-options-selection',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, FormsModule],
  providers: [CurrencyPipe],
  templateUrl: './options-selection.component.html',
  styleUrl: './options-selection.component.scss',
})
export class OptionsSelectionComponent {
  private currencyPipe: CurrencyPipe = inject(CurrencyPipe);
  private carConfiguratorApi: CarConfiguratorApiService = inject(
    CarConfiguratorApiService,
  );

  protected readonly parseInt = parseInt;

  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );

  protected configDescription: Signal<string> = computed(() => {
    const selectedConfig: ModelConfig =
      this.configuratorService.selectedConfig();

    return `Range: ${selectedConfig.range} - Max speed: ${selectedConfig.speed} - Cost: ${this.currencyPipe.transform(selectedConfig.price, 'USD')}`;
  });

  // constructor() {
  //   this.configuratorService.modelOptions = toSignal(
  //     this.carConfiguratorApi.getModelOptions(
  //       this.configuratorService.carModelCode(),
  //     ),
  //     {
  //       initialValue: { configs: [], towHitch: false, yoke: false },
  //     },
  //   );
  // }
}
