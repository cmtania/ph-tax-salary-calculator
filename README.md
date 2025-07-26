# Philippine Tax & Salary Calculator

A modern, clean web application for calculating Philippine taxes and salary deductions using the latest 2024 tax rates and contribution tables.

## Features

- **Accurate 2024 Calculations**: Uses the most current Philippine tax brackets and contribution rates
- **Multiple Payroll Periods**: Supports monthly, semi-monthly, weekly, and daily calculations
- **Complete Breakdown**: Shows detailed deductions including:
  - Income Tax (after contributions)
  - SSS Contributions
  - PhilHealth Contributions
  - Pag-IBIG Contributions
- **Modern UI**: Clean, minimalist design with black, white, and grey color scheme
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Calculations**: Updates immediately as you type

## Tax Information (2024)

### Income Tax Brackets
- ₱0 - ₱20,833: 0%
- ₱20,833 - ₱33,333: 20%
- ₱33,333 - ₱66,667: 25%
- ₱66,667 - ₱166,667: 30%
- ₱166,667 - ₱666,667: 32%
- Above ₱666,667: 35%

### Mandatory Contributions
- **SSS**: Variable rates based on salary bracket (employee share)
- **PhilHealth**: 2.5% of salary (max ₱2,000, min ₱500)
- **Pag-IBIG**: 2% of salary (max ₱200)

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Important Notes

- Calculations are based on 2024 Philippine tax rates and contribution tables
- Income tax is computed after deducting mandatory contributions (SSS, PhilHealth, Pag-IBIG)
- All mandatory contributions are tax-exempt
- This calculator assumes standard deductions only
- Results are estimates - consult with HR or tax professionals for exact calculations

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
