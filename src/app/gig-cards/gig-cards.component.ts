import { Component,  OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Gigs } from '../gigModel';
import { GigService } from '../gigService';
import { map } from 'rxjs/operators';
import { Observable, Subscription} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { GigDetailsComponent } from '../gig-details/gig-details.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-gig-cards',
  templateUrl: './gig-cards.component.html',
  styleUrls: ['./gig-cards.component.css']

})



export class GigCardsComponent implements OnInit, OnDestroy {



private gigObservible: Observable<Gigs[]>;

  totalVote = 0;
  totalrunningPrice = 10;

  gigs: Gigs[];
  gigSubscription: Subscription;
  fieldToUpdateAndValue: JSON;
  selector: 'date-pipe';

  private isAuth = false;
  AuthCarry: boolean;
  userID: string;

  authSubscription: Subscription;
  currentuserSubscription: Subscription;

  constructor(private gigService: GigService,
              private db: AngularFirestore,
              private dialog: MatDialog,
              private authServices: AuthService) { }

  ngOnInit() {

    this.gigSubscription = this.gigService.gigsChanged.subscribe(
      gigs => (this.gigs = gigs)
    );
    this.gigService.fetchGigs();

    this.authServices.innitAuthListener();
    this.authSubscription = this.authServices.authChange.subscribe(
      authStatus => { (
                this.isAuth = authStatus);

    });

    // this.authSubscription = this.authServices.authChange.subscribe(authStatus => {
    // this.isAuth = authStatus;
    // console.log('authStatus =', authStatus);
    // console.log('is auth   = ' +  );
    // });
  
    // // this.isAuth = this.authServices.isAuth();
    // console.log('is auth  2 ' + this.isAuth);
  }


  signUp(gig: Gigs) {

    this.dialog.open(GigDetailsComponent, {
      data: {
        gigArtistName: gig.gigArtistName,
        gigVenueName: gig.gigVenueName,
        gigDate: gig.gigDate
      }
    } );

  }


  addPunter(gig: Gigs) {
    this.authServices.getUserID();

    this.authSubscription = this.authServices.currentUser.subscribe(
      userID => { (this.userID = userID);
                  this.gigService.registerForGig(userID, gig.id );

      });
  }
  totalPunterIncrement(gig: Gigs) {

    const punterCount = gig.gigPunterCount ++;
    console.log(punterCount);

    this.db.collection('gigs')
     .doc(gig.id)
     .set({ gigPunterCount: punterCount }, { merge: true });

    console.log('delay ' + punterCount);
    this.signUp(gig);

  }


  Reset() {
    console.log('Reset');
    this.totalVote = 0;
   // this.thisGig.gigTotalPrice = 0;
    this.totalrunningPrice = 0;

  }



    onSubmit(form: NgForm) {

      console.log(form.value.gigDescription);
      console.log(form.value.gigVenueName);
      console.log(form.value.gigArtistName);
      console.log(form.value.gigDate);
      console.log(form.value.gigTotalPrice);

     // WORKS BUT CAN'T GET IT USE A GIG TYPE TO UP DATE

      const runningGig = {
        gigDescription: form.value.gigDescription,
        gigVenueName: form.value.gigVenueName,
        gigArtistName: form.value.gigArtistName,
        gigDate: form.value.gigDate,
        gigTotalPrice: form.value.gigTotalPrice,
        gigPunterCount: 0
      };
      this.addDataToDatabase(runningGig);
    }

    private addDataToDatabase(addGig: any) {
      this.db.collection('gigs').add(addGig);
    }

    ngOnDestroy() {

    this.gigSubscription.unsubscribe();
    this.authSubscription.unsubscribe();

  }

}
