import { Component, inject } from '@angular/core';
import { ImageContainerComponent } from '@shared';
import { NavbarComponent } from '@core';
import { RouterOutlet } from '@angular/router';
import { CarConfiguratorService } from '@features/configurator';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ImageContainerComponent, NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );
}
