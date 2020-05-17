import { Component,  OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription, Observable} from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GigService } from '../gigService';
import { Gigs } from '../gigModel';

@Component({

    selector: 'app-gig-mine',
    templateUrl: './gig-mine.component.html',
    styleUrls: ['./gig-mine.component.css']

  })

  export class GigMineComponent implements OnInit, OnDestroy {

  constructor(
               private db: AngularFirestore,
               private authServices: AuthService,
               private gigService: GigService )  { }


  // UserDetails: any[];
  // gigsAndPunters: Observable<any[]>;
  // gigsForAPunter: Observable<any[]>;
  //  authSubscription: Subscription;
  // gigsAndPuntersSub: Subscription;
  // userID: string;
  // gigID: any;
  // count: number;
  // gigs: Gigs[];
  // gigIDArray = [];
  // filteredGigs: Gigs;

  // private avalablefilteredGigs: Gigs[] = [];

  // private userIDcarry: string;
  
   myGigSubscription: Subscription;
   filteredGigs: Gigs[];
    

    ngOnInit() {



      this.myGigSubscription = this.gigService.filteredGigsChanged.subscribe(

        filteredGigs => { this.filteredGigs = filteredGigs;
        });
      this.gigService.fetchGigsForCurrentUser();

    }

    ngOnDestroy( ) {
      this.myGigSubscription.unsubscribe();
      // this.authSubscription.unsubscribe();
    }

  }
