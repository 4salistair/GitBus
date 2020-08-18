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
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';

import { GigMineComponent } from './gig-mine/gig-mine.component';
import { GigCardsComponent } from './gig-cards/gig-cards.component';
import { LoginComponent } from './auth/login/login.component';
import { GigAddComponent} from './gig-add/gig-add.component';
import { SignupComponent} from './auth/signup/signup.component';
import { GigDetailsComponent } from './gig-details/gig-details.component';

import { AuthService } from './auth/auth.service';
import { GigService } from './gigService';
import { UIservice } from './UIservice';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { PunterAlreadyOnGig } from './punterAlreadyOnGig.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    GigCardsComponent,
    GigDetailsComponent,
    GigAddComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    GigMineComponent,
    PunterAlreadyOnGig

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

  providers: [AuthService, UIservice , GigService, { provide: MaterialModule, useValue: [] }],
  bootstrap: [AppComponent],
  entryComponents: [GigDetailsComponent]

})
export class AppModule { }
