import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownOption } from '../../models/dropdown-option.interface';

@Component({
  selector: 'app-custom-dropdown',
  standalone: false,
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ]
})
export class CustomDropdownComponent implements ControlValueAccessor, OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() id: string = '';

  @Output() selectionChange = new EventEmitter<any>();

  selectedOption: DropdownOption | null = null;
  isOpen: boolean = false;
  isFocused: boolean = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    // Set default selection if options are provided and no value is set
    if (this.options.length > 0 && !this.selectedOption) {
      this.selectOption(this.options[0]);
    }
  }

  toggleDropdown(): void {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isFocused = true;
    } else {
      this.onTouched();
    }
  }

  selectOption(option: DropdownOption): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.isFocused = false;
    
    this.onChange(option.value);
    this.selectionChange.emit(option.value);
    this.onTouched();
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.custom-dropdown');
    
    if (!dropdown) {
      this.isOpen = false;
      this.isFocused = false;
      this.onTouched();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleDropdown();
        break;
      case 'Escape':
        this.isOpen = false;
        this.isFocused = false;
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateOptions(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateOptions(-1);
        break;
    }
  }

  private navigateOptions(direction: number): void {
    if (!this.isOpen) {
      this.isOpen = true;
      return;
    }

    const currentIndex = this.selectedOption 
      ? this.options.findIndex(opt => opt.value === this.selectedOption!.value)
      : -1;
    
    let nextIndex = currentIndex + direction;
    
    if (nextIndex < 0) {
      nextIndex = this.options.length - 1;
    } else if (nextIndex >= this.options.length) {
      nextIndex = 0;
    }
    
    this.selectOption(this.options[nextIndex]);
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    const option = this.options.find(opt => opt.value === value);
    this.selectedOption = option || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Track by function for ngFor performance
  trackByValue(index: number, option: DropdownOption): any {
    return option.value;
  }
}
