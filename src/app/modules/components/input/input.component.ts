import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputModel } from '../../models/input.model';
import { DropdownOption } from '../../models/dropdown-option.interface';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @Output() calculate = new EventEmitter<InputModel>();

  payrollPeriods: DropdownOption[] = [
    { value: 1, label: 'Monthly', icon: 'fas fa-calendar-alt' },
    { value: 2, label: 'Semi-Monthly', icon: 'fas fa-calendar-week' },
    { value: 3, label: 'Bi-Weekly', icon: 'fas fa-calendar-day' },
    { value: 4, label: 'Weekly', icon: 'fas fa-calendar' }
  ]

  inputForm!: FormGroup;

  ngOnInit(): void {
    this.initInputFields();
  }

  private initInputFields(): void {
    this.inputForm = new FormGroup({
      PayrollPeriod: new FormControl(1, [Validators.required]),
      GrossSalary: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    });
  }

  get getPeriodLabel(): string {
    const selectedPeriod = this.inputForm.get('PayrollPeriod')?.value || 1;
    return this.payrollPeriods[selectedPeriod - 1].label;
  }

  onCalculate(): void {
    if (this.inputForm.valid) {
      const formData = this.inputForm.value;
      console.log('Form Data:', formData);

      const inputModel: InputModel = {
        payrollPeriod: Number(formData.PayrollPeriod),
        grossSalary: Number(formData.GrossSalary)
      }
     
      console.log('Input Model with converted types:', inputModel);
      this.calculate.emit(inputModel);
    }
  }

}
