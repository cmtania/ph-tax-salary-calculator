import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCurrencyInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true
    }
  ]
})
export class CurrencyInputDirective implements ControlValueAccessor {

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    let value = input.value;

    // Remove all non-numeric characters except decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }

    // Remove leading zeros but keep one zero before decimal
    if (value && value !== '0' && !value.startsWith('0.')) {
      value = value.replace(/^0+/, '') || '0';
    }

    // Format with commas
    const formattedValue = this.addCommas(value);
    
    // Update input display
    input.value = formattedValue;

    // Emit the numeric value (without commas) to the form control
    const numericValue = parseFloat(value.replace(/,/g, '')) || 0;
    this.onChange(numericValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  @HostListener('focus', ['$event'])
  onFocus(event: any): void {
    const input = event.target;
    // Remove commas on focus for easier editing
    let value = input.value.replace(/,/g, '');
    if (value === '0') {
      value = '';
    }
    input.value = value;
  }

  private addCommas(value: string): string {
    if (!value) return '';
    
    const parts = value.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];

    // Add commas to integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (decimalPart !== undefined) {
      return `${integerPart}.${decimalPart}`;
    } else {
      return integerPart;
    }
  }

  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      const formattedValue = this.addCommas(value.toString());
      this.elementRef.nativeElement.value = formattedValue;
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}
