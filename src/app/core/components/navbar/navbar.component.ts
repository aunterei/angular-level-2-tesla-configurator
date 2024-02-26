import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarConfiguratorService } from '@features/configurator';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected configuratorService: CarConfiguratorService = inject(
    CarConfiguratorService,
  );
}
