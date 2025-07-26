import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesoCurrency',
  standalone: true
})
export class PesoCurrencyPipe implements PipeTransform {

  transform(value: any): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '₱0.00';
    }
    
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(Number(value));
  }

}