import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NotesComponent } from "../components/notes/notes.component";
import { InputComponent } from "../components/input/input.component";
import { SalaryBreakdownComponent } from "../components/salary-breakdown/salary-breakdown.component";
import { CustomDropdownComponent } from "../components/custom-dropdown/custom-dropdown.component";
import { PesoCurrencyPipe } from "../pipes/format-currency/format-currency.pipe";
import { CurrencyInputDirective } from "../directives/currency-input.directive";
import { ClickOutsideDirective } from "../directives/click-outside.directive";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        PesoCurrencyPipe
    ],
    declarations: [
        LayoutComponent,
        NotesComponent,
        InputComponent,
        SalaryBreakdownComponent,
        CustomDropdownComponent,
        CurrencyInputDirective,
        ClickOutsideDirective
    ],
    exports: [],
    providers: []
})
export class LayoutModule {}