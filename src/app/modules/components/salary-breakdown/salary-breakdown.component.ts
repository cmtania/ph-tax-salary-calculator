import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SalaryBreakdown } from '../../models/salary-breakdown.interface';
import { InputModel } from '../../models/input.model';
import { SalaryComputationService } from '../../services/salary-computation.service';

@Component({
  selector: 'app-salary-breakdown',
  standalone: false,
  templateUrl: './salary-breakdown.component.html',
  styleUrl: './salary-breakdown.component.scss'
})
export class SalaryBreakdownComponent implements OnChanges {

  @Input() inputData!: InputModel;

  salaryBreakdown!: SalaryBreakdown;

  constructor(private salaryComputationService: SalaryComputationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputData'] && this.inputData) {
      this.salaryBreakdown = this.salaryComputationService.calculateSalary(this.inputData);
    }
  }
}
