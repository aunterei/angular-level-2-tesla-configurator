import { Component, Input } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'app-image-container',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
})
export class ImageContainerComponent {
  @Input({ required: true })
  set imageSrc(value: string) {
    this._imageSrc = value;
    this.imageLoading = true;
  }
  get imageSrc() {
    return this._imageSrc;
  }

  @Input({ required: true })
  height!: number;

  @Input({ required: true })
  width!: number;

  @Input()
  alt: string = 'Image could not be loaded.';

  @Input()
  priority = true;

  protected imageLoading = true;

  private _imageSrc!: string;
}
