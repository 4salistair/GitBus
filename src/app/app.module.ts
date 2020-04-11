import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertButtonComponent } from './alert-button/alert-button.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GigDetailsComponent } from './gig-details/gig-details.component';




@NgModule({
  declarations: [
    AppComponent,

    AlertButtonComponent,

    GigDetailsComponent,
  ],
  imports: [

    BrowserModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
