import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { ProgramsGridComponent } from './programs-grid/programs-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpCallsService } from './services/http-calls.service';
import { AppRoutingModule } from "./app-routing.module";
@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    ProgramsGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
