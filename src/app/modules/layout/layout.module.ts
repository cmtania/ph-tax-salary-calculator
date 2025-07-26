import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NotesComponent } from "../components/notes/notes.component";
import { InputComponent } from "../components/input/input.component";
import { SalaryBreakdownComponent } from "../components/salary-breakdown/salary-breakdown.component";
import { PesoCurrencyPipe } from "../pipes/format-currency/format-currency.pipe";


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
        SalaryBreakdownComponent
    ],
    exports: [],
    providers: []
})
export class LayoutModule {}