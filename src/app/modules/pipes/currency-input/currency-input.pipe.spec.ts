import { TestBed } from '@angular/core/testing';
import { CurrencyInputPipe } from './currency-input.pipe';

describe('CurrencyInputPipe', () => {
  let pipe: CurrencyInputPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyInputPipe]
    });
    pipe = new CurrencyInputPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for 0 or "0"', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform('0')).toBe('');
  });

  it('should remove leading zeros', () => {
    expect(pipe.transform('00123')).toBe('123');
    expect(pipe.transform('000')).toBe('');
  });

  it('should add commas for thousands', () => {
    expect(pipe.transform('1000')).toBe('1,000');
    expect(pipe.transform('10000')).toBe('10,000');
    expect(pipe.transform('100000')).toBe('100,000');
    expect(pipe.transform('1000000')).toBe('1,000,000');
  });

  it('should handle decimal numbers', () => {
    expect(pipe.transform('1000.50')).toBe('1,000.50');
    expect(pipe.transform('10000.99')).toBe('10,000.99');
  });

  it('should handle empty or null values', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
