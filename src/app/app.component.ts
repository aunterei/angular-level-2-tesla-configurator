import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core';
import { ImageContainerComponent } from '@shared';
import { CarConfiguratorService } from '@features/configurator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    RouterOutlet,
    NavbarComponent,
    ImageContainerComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );
}
