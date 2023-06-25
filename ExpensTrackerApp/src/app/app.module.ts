import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';   
import { HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { LoginComponent } from './login/login.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { ViewtransactionsComponent } from './viewtransactions/viewtransactions.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
PlotlyModule.plotlyjs = PlotlyJS;    
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ViewtransactionsComponent,
    SettingsComponent,
    LoginComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    PlotlyModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
