import { Injectable } from "@angular/core";
import { SalaryBreakdown } from "../models/salary-breakdown.interface";
import { taxBrackets } from "../formula/tax-bracket.constant";
import { sssBracket } from "../formula/sss-bracket.constant";
import { InputModel } from "../models/input.model";

@Injectable({
    providedIn: "root"
})
export class SalaryComputationService {

    private taxBrackets = taxBrackets;
    private sssBrackets = sssBracket;
    constructor() {}

    calculateSalary(inputData: InputModel): SalaryBreakdown {
        if (inputData.grossSalary <= 0) {
            return {
                grossSalary: inputData.grossSalary,
                incomeTax: 0,
                sssContribution: 0,
                philhealthContribution: 0,
                pagibigContribution: 0,
                totalDeductions: 0,
                netSalary: 0
            };
        }
        const monthlySalary = this.convertToMonthly(inputData.payrollPeriod, inputData.grossSalary);
        
        // Calculate income tax
        const incomeTax = this.calculateIncomeTax(monthlySalary);
        
        // Calculate contributions
        const sssContribution = this.calculateSSS(monthlySalary);
        const philhealthContribution = this.calculatePhilHealth(monthlySalary);
        const pagibigContribution = this.calculatePagibig(monthlySalary);
        
        const totalDeductions = incomeTax + sssContribution + philhealthContribution + pagibigContribution;
        const netSalary = monthlySalary - totalDeductions;
        
        return {
            grossSalary: monthlySalary,
            incomeTax: incomeTax,
            sssContribution: sssContribution,
            philhealthContribution: philhealthContribution,
            pagibigContribution: pagibigContribution,
            totalDeductions: totalDeductions,
            netSalary: netSalary
        };
  }

  private convertToMonthly(payrollPeriod: number, amount: number): number {
    console.log('convertToMonthly called with:', { payrollPeriod, amount, payrollPeriodType: typeof payrollPeriod });
    
    switch (payrollPeriod) {
      case 1: return amount; // Monthly
      case 2: return amount * 2; // Semi-Monthly
      case 3: return amount * 4.33; // Bi-Weekly
      case 4: return amount * 22; // Weekly
      default: return amount;
    }
  }

//   private convertFromMonthly(payrollPeriod: number, amount: number): number {
//     switch (payrollPeriod) {
//       case 1: return amount;
//       case 2: return amount / 2;
//       case 3: return amount / 4.33;
//       case 4: return amount / 22;
//       default: return amount;
//     }
//   }

  private calculateIncomeTax(monthlySalary: number): number {
    // Deduct contributions first (tax-exempt)
    const sssContribution = this.calculateSSS(monthlySalary);
    const philhealthContribution =  this.calculatePhilHealth(monthlySalary);
    const pagibigContribution = this.calculatePagibig(monthlySalary);

    const overAllContributions = sssContribution + philhealthContribution + pagibigContribution;
    
    const taxableIncome = monthlySalary - overAllContributions;
    
    for (const bracket of this.taxBrackets) {
      if (taxableIncome > bracket.min && (bracket.max === null || taxableIncome <= bracket.max)) {
        return bracket.baseAmount + (taxableIncome - bracket.min) * bracket.rate;
      }
    }
    return 0;
  }

  private calculateSSS(monthlySalary: number): number {
    // 2025 SSS contribution table (employee share only)
    // Based on official SSS table from https://taxcalculatorphilippines.com/sss-contribution-table-employees-employers
    
    if (monthlySalary < 5250) return 250; // Below 5,250
    
    // Find the appropriate range
    for (const range of this.sssBrackets) {
      if (
        monthlySalary >= range.min &&
        (range.max === null || monthlySalary <= range.max)
      ) {
        return range.contribution;
      }
    }
    
    // For salaries 34,750 and above (maximum)
    if (monthlySalary >= 34750) {
      return 1750; // Maximum employee contribution
    }
    
    return 250; // Fallback (minimum contribution)
  }

  private calculatePhilHealth(monthlySalary: number): number {
    // 2024 PhilHealth contribution (5% of salary, employee share is 2.5%)
    const contribution = Math.min(monthlySalary * 0.025, 2000); // Maximum of ₱2,000
    return Math.max(contribution, 500); // Minimum of ₱500
  }

  private calculatePagibig(monthlySalary: number): number {
    // Pag-IBIG contribution: 2% of salary, max ₱200
    return Math.min(monthlySalary * 0.02, 200);
  }
}