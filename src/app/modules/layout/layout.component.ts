import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModel } from '../models/input.model';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  title = 'Philippine Tax & Salary Calculator';

  contact =  {
    Email: 'mailto:tania.dev.ph@gmail.com',
    Linkedin: 'https://www.linkedin.com/in/taniachristian/',
    Github: 'https://github.com/cmtania'
   };

  
  inputData: InputModel = {
    grossSalary: 0,
    payrollPeriod: 1
  };

  showBreakdown: boolean = false;
  
  calculate(input: InputModel): void {
    if(!input || !input.grossSalary || !input.payrollPeriod) {
      return;
    }

    this.showBreakdown = true;
    // Create a new object reference to trigger ngOnChanges
    this.inputData = {
      grossSalary: input.grossSalary,
      payrollPeriod: input.payrollPeriod
    };
  }

}
