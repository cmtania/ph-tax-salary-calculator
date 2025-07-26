
import { NgModule } from '@angular/core';
import { LayoutModule } from './modules/layout/layout.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
