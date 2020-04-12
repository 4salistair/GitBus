import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertButtonComponent } from './alert-button/alert-button.component';
import { GigService } from './gigService';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GigDetailsComponent } from './gig-details/gig-details.component';
import { environment } from 'src/environments/environment';




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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],

  providers: [GigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
