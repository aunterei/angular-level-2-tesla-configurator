import { Component, computed, inject, Signal } from '@angular/core';
import { CarConfiguratorService } from '@features/configurator';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelConfig, SelectOptions } from '@types';
import { SelectComponent } from '@shared';

@Component({
  selector: 'app-options-selection',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, FormsModule, SelectComponent],
  providers: [CurrencyPipe],
  templateUrl: './options-selection.component.html',
  styleUrl: './options-selection.component.scss',
})
export class OptionsSelectionComponent {
  private currencyPipe: CurrencyPipe = inject(CurrencyPipe);

  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );

  protected configDescription: Signal<string> = computed(() => {
    const selectedConfig: ModelConfig =
      this.configuratorService.selectedConfig();

    return `Range: ${selectedConfig.range} - Max speed: ${selectedConfig.speed} - Cost: ${this.currencyPipe.transform(selectedConfig.price, 'USD')}`;
  });

  protected configSelectOptions: SelectOptions<ModelConfig> = {
    id: 'configSelect',
    label: 'Config:',
    options: computed(() => this.configuratorService.modelOptions().configs),
    trackBy: (config: ModelConfig) => config.id,
    optionValueKey: 'id',
    optionLabelKey: 'description',
  };
}
