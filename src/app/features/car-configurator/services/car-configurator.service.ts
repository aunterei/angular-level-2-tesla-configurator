import {
  computed,
  inject,
  Injectable,
  Injector,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CarConfiguratorApiService } from '@apis';
import { CarModel, ModelOptions, ModelConfig } from '@types';
import { CarConfiguratorError } from '@core';

@Injectable({
  providedIn: 'root',
})
export class CarConfiguratorService {
  private carConfiguratorApi: CarConfiguratorApiService = inject(
    CarConfiguratorApiService,
  );

  public carModelCode: WritableSignal<string> = signal<string>('');
  public carColorCode: WritableSignal<string> = signal<string>('');
  public carConfigId: WritableSignal<string> = signal<string>('');
  public towHitch: WritableSignal<boolean> = signal<boolean>(false);
  public yokeSteering: WritableSignal<boolean> = signal<boolean>(false);

  public allCarModels: Signal<CarModel[]> = toSignal(
    this.carConfiguratorApi.getAllModels(),
    { initialValue: [] },
  );

  public isModelSelected: Signal<boolean> = computed(
    () => !!this.carModelCode() && !!this.carColorCode(),
  );

  public isConfigSelected: Signal<boolean> = computed(
    () => !!this.carConfigId(),
  );

  public modelOptions: Signal<ModelOptions> = signal({
    configs: [],
    towHitch: false,
    yoke: false,
  });

  public carImageSrc: Signal<string> = computed(() => {
    if (this.carModelCode() && this.carColorCode()) {
      return `https://interstate21.com/tesla-app/images/${this.carModelCode()}/${this.carColorCode()}.jpg`;
    }
    return '';
  });

  public selectedConfig: Signal<ModelConfig> = computed(() => {
    const selected: ModelConfig | undefined = this.modelOptions().configs.find(
      (config: ModelConfig) => config.id === parseInt(this.carConfigId()),
    );

    if (!selected)
      throw new CarConfiguratorError(
        'Error while fetching selected configuration.',
      );

    return selected;
  });

  public resetOptions(): void {
    this.carConfigId.set('');
    this.towHitch.set(false);
    this.yokeSteering.set(false);
  }

  constructor(private injector: Injector) {
    toObservable(this.carModelCode).subscribe(
      (carModelCode: string) =>
        (this.modelOptions = toSignal(
          this.carConfiguratorApi.getModelOptions(carModelCode),
          {
            initialValue: {
              configs: [],
              towHitch: false,
              yoke: false,
            },
            injector: this.injector,
          },
        )),
    );
  }
}
