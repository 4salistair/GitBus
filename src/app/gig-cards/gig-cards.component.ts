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
// import { PunterAlreadyOnGig} from '../punterAlreadyOnGig.pipe';



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

  private isAlready = true;
  private gigsAllPunters: Gigs[];
 
  filteredGigSubscription: Subscription;
  private isGigs: any;

  private onBusAlready: boolean;

 //
 // isAlreadySubscription: Subscription;
 isAlreadySubscription: Subscription;

  isAlreadyOnBus$: Observable<boolean>;
 //

  AuthCarry: boolean;
  userID: string;

  authSubscription: Subscription;
  currentuserSubscription: Subscription;
//  OnbusAlready: Subscription;
 
stringTest: string;
gigsFiltered: Gigs[];
gigFilterSubscription: Subscription;

  constructor(private gigService: GigService,
              private db: AngularFirestore,
              private dialog: MatDialog,
              private authServices: AuthService,
              ) {



              }


ngOnInit() {


  this.gigSubscription = this.gigService.gigsChanged.subscribe(
    gigs => (this.gigs = gigs)
    );
  this.gigService.fetchGigs();

  this.gigFilterSubscription = this.gigService.filteredGigsChanged.subscribe(
    gigsFiltered =>  (this.gigsFiltered = gigsFiltered)
  );

  this.gigService.fetchGigsForCurrentUser();
 

 




  
  

  this.stringTest = '1234string';
 // this.isAlreadyOnBus$ = this.punterOnGigPipe.isOnBusChanged.subscribe();

  // this.isAlreadySubscription = this.gigService.isOnBusChanged.subscribe(
  //  onBusAlready => { (this.onBusAlready = onBusAlready );
  //                    console.log('inSub ' + this.onBusAlready);
  //   });




  ///

 // this.gigService.fetchGigs();
  ///

  this.authServices.innitAuthListener();

  this.authSubscription = this.authServices.authChange.subscribe(
      authStatus => { (
                this.isAuth = authStatus);
    });

  }


//
  // testToggle() {

  //   this.isAlreadySubscription = this.gigService.isAlreadySubject.subscribe(
  //     isAlready => (this.isAlready = isAlready)
  //     );
  //   this.gigService.isAlready(this.userID);
  // }
//


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
                  this.gigService.registerForGig(userID.substring(0, 50), gig.id );

      });
  }


  addPunterGig(gigID: string) {
    
      ///this.authServices.getUserID();
      this.gigService.totalPunterIncrement(gigID);
      this.gigService.puntersGigs(gigID);
      this.gigService.runningCostDecrement(gigID);

  }

  callIsAlready() {


    this.isAlreadySubscription = this.gigService.isAlreadySubject.subscribe(
      gigsAllPunters => { (this.gigsAllPunters = gigsAllPunters);

     }
    );
    this.gigService.getAllGigsForAllPunters();
    console.log('All Gigs ' + this.gigsAllPunters);

    // return this.isAlready;
  }

    // this.authSubscription = this.authServices.currentUser.subscribe(
    //   userID => { (this.userID = userID);

    //  });
    // this.authServices.getUserID();
    // console.log(this.userID.substring(0, 50));


//  console.log('isAlready boolean before ' + this.isAlready);

    // this.filteredGigSubscription = this.gigService.filteredGigsChanged.subscribe(
    //   isGigs => (this.isGigs = isGigs)

    //   );

    // this.gigService.fetchGigsForCurrentUser();
    // console.log('isGigs ' + this.isGigs);

      // this.myGigSubscription = this.gigService.filteredGigsChanged.subscribe(

      //   filteredGigs => { this.filteredGigs = filteredGigs;
      //   });
      // this.gigService.fetchGigsForCurrentUser();



   
    
    // const gigMatch = false;

  //  const user = this.authServices.getUser();
   //  this.authServices.getUserID();
    // console.log('userID ' + userID);

   
   // console.log('userNumber ' + user.userID);
   // return gigMatch;

    // this.authServices.getUserID();

    // this.authSubscription = this.authServices.currentUser.subscribe(
    //  userID => { (this.userID = userID);
    //              console.log(userID.substring(0, 50));

   //  });

 



  // totalPunterIncrement(gigID: string) {

  //   // Not sure I need this!!!

  //   // if (gig.gigPunterCount == NaN) {
  //   //   gig.gigPunterCount = 0;
  //   //   console.log('if null set to 0');
  //   // }

  //   const punterCount = gig.gigPunterCount ++;


  //   console.log(punterCount);

  //   this.db.collection('gigs')
  //    .doc(gig.id)
  //    .set({ gigPunterCount: punterCount }, { merge: true });

  //  // console.log('delay ' + punterCount);
  //  // this.signUp(gig);

  // }


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
    //
   // this.isAlreadySubscription.unsubscribe();

  }

}
