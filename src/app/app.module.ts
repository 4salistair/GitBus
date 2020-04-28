import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GigDetailsComponent } from './gig-details/gig-details.component';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { GigService } from './gigService';
import { GigCardsComponent } from './gig-cards/gig-cards.component';
import { LoginComponent } from './auth/login/login.component';
import { GigAddComponent} from './gig-add/gig-add.component';


@NgModule({
  declarations: [
    AppComponent,
    GigCardsComponent,
    GigDetailsComponent,
    GigAddComponent,
    LoginComponent
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

  providers: [GigService, { provide: MaterialModule, useValue: [] }],
  bootstrap: [AppComponent],
  entryComponents: [GigDetailsComponent]

})
export class AppModule { }
