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

@Injectable({
  providedIn: 'root',
})
export class CarConfiguratorService {
  private carConfiguratorApi: CarConfiguratorApiService = inject(
    CarConfiguratorApiService,
  );

  public carModelCode: WritableSignal<string> = signal<string>('');
  public carColorCode: WritableSignal<string> = signal<string>('');
  public carConfigId: WritableSignal<number> = signal<number>(0);
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
    () => this.carConfigId() > 0,
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
      (config: ModelConfig) => config.id === this.carConfigId(),
    );

    //TODO: custom error with redirection?
    if (!selected) throw new Error();

    return selected;
  });

  public resetOptions(): void {
    this.carConfigId.set(0);
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
