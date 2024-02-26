import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectOptions } from '@types';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent<T> implements ControlValueAccessor {
  @Input({ required: true })
  selectOptions!: SelectOptions<T>;

  @Input()
  emptyOption: boolean = true;

  public selectedValue: string = '';

  onChange!: (value: string) => void;
  onTouched!: () => void;

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: string): void {
    this.selectedValue = value;
  }

  protected selectValue(value: string): void {
    this.selectedValue = value;
    this.onChange(value);
  }
}
