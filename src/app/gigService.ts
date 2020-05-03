import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Subscription} from 'rxjs';
import { Gigs } from './gigModel';
import { User } from './auth/user.model';

//// ???? /////
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
//// ???? /////

@Injectable({
  providedIn: 'root'
})

export class GigService {

  private fbSubs: Subscription[] = [];
  private availableGigs: Gigs[] = [];
  private filteredGigs: Gigs[] = [];
  gigsChanged = new Subject<Gigs[]>();

  id: string;

/////?
items$: Observable<Gigs[]>;
locationFilter$: BehaviorSubject<string|null>; // size
/////?
  constructor(private db: AngularFirestore)
  /////?
  {
    this.locationFilter$ = new BehaviorSubject(null);
    this.items$ = Observable.combineLatest(
    this.locationFilter$
    )
    .switchMap(([location]) =>
    db.collection<Gigs>('Location', ref => {
      let query: firebase.firestore.Query = ref;
      if (location) { query = query.where('gigVenueName', '==', location); }
      return query;
    }).valueChanges()
    );

  }
  /////?
  fetchGigs() {
       this.db
       .collection('gigs')
       .snapshotChanges()
       .pipe(map(docData => {
        return docData.map(doc => {
         return {
            id: doc.payload.doc.id,
            gigArtistName: doc.payload.doc.data()['gigArtistName'],
            gigDescription: doc.payload.doc.data()['gigDescription'],
            gigVenueName: doc.payload.doc.data()['gigVenueName'],
            gigDate: doc.payload.doc.data()['gigDate'],
            gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
            gigPunterCount: doc.payload.doc.data()['gigPunterCount']
            };
          });
        })
        )
        .subscribe((Gig: Gigs[]) => {
        this.availableGigs =  Gig;
        this.gigsChanged.next([...this.availableGigs]);
        });

  }

  registerForGig(userID: string, gigID: string ) {

  this.db.collection('gigs').doc(gigID).collection('interestedUsers').add({userID , gigID});
 
  }

  addGig(gig: Gigs) {
    this.db.collection('gigs').add(gig);
  }

  myGig(currentUserID: string ) {

    // tslint:disable-next-line: max-line-length
    currentUserID = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4ODQ4YjVhZmYyZDUyMDEzMzFhNTQ3ZDE5MDZlNWFhZGY2NTEzYzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2lnYnVzLTRmMGI1IiwiYXVkIjoiZ2lnYnVzLTRmMGI1IiwiYXV0aF90aW1lIjoxNTg4MzE5NzM4LCJ1c2VyX2lkIjoiN3EzQWVFbGE5c2dKTEY3QVNkSmx1QkRHS2lmMSIsInN1YiI6IjdxM0FlRWxhOXNnSkxGN0FTZEpsdUJER0tpZjEiLCJpYXQiOjE1ODgzMTk3MzgsImV4cCI6MTU4ODMyMzMzOCwiZW1haWwiOiIxMjM0NUAxMjMuMTIzIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzQ1QDEyMy4xMjMiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.d7JOqLvsRRTCIV05qOqIPwbceBBJagPkRfTY49Yy5i8wb3vK0JX_8GP3qdb8KhBuXxYyyOVEx-kVyKAfrweB994HH-C1rONrwE_giX7-shXh-nq49GNYHYbhtHB8lXe0Tev7pZ1P2hvEHFSJYWSgHfaMj4UsZl-t0ulcvCibz6L2RRTSMi9m0Xtq03Agw_zN0hiH9iOWJNt1Qr0ppCHqKqfbY3oclFYI-O4ND1Ys0cWPpbhlcgAk05TLjey5Z88ygW231foBZh08ikTCbIYJLk7tOF5a7I2Tcg6lQZkAH9JxxhbShN3nlMyvu8cGu2TxNSaq2utsROgmoZtuo913UA';

  }

  filterByLocation(location: string|null) {
    this.locationFilter$.next(location);
  }
    // const size$ = new Subject<string>();
    // const queryObservable = size$.pipe(
    //   switchMap(size => 
    //     afs.collection('items', ref => ref.where('size', '==', size)).valueChanges()
    //   )
    // );
    
    // subscribe to changes
    // queryObservable.subscribe(queriedItems => {
    //   console.log(queriedItems);  
    // });
    
    // // trigger the query
    // size$.next('large');
    
    // // re-trigger the query!!!
    // size$.next('small');


    // const size = new Subject<string>();
    // const queryObservable = size.pipe(Map(size => 
    //     this.db.collection('gigs', ref => ref.where('gigVenueName', '==', 'Liverpool')).valueChanges()
    //   )
    // );
    
    // // subscribe to changes
    // queryObservable.subscribe(queriedItems => {
    //   console.log(queriedItems);  
    // });
    
    // // trigger the query
    // size$.next('large');
    
    // // re-trigger the query!!!
    // size$.next('small');



   // const interestedUser = this.db.collection('gigs');
    // const interestedGig = this.db.collection('gigs').doc('interestedUser');

    // const interestedUser = this.db.firestore.collectionGroup('interestedUser')
    //                  .where('user', '==', currentUserID);

    // interestedUser.get().then(returnedObject => {returnedObject = returnedObject;
    //                                              console.log(returnedObject.docs);
       // console.log(interestedUser.firestore.app
                                                // });
                                                // }
   // var myUserId =  this.db.auth().currentUser.uid;
  //   let myReviews = firebase.firestore().collectionGroup('reviews')
  //     .where('user', '==', currentUserID);
  //   myReviews.get().then(function (querySnapshot) {
  //      // Do something with these reviews!
  //   })

  // }

    // let myReviews = this.db.collectionGroup('interestedUser')

    // const Interested = this.db.firestore
    //               .collectionGroup('interestedUser')
    //               .where('userID', '==', currentUserID );
  
    // Interested.get().then( runquery => {
    //                runquery =  runquery;
    //                console.log(runquery);

    // this.comments = this.db
    //                 .collection('interestedUser')
    //                 .doc('gigs')
    //                 .co
      // Interested.get().then( runquery => {
      //              runquery =  runquery;
      //              console.log(runquery);

     //});

    // .snapshotChanges()
    // .pipe(map(docData => {
    //  return docData.map(doc => {
    //   return {
    //      id: doc.payload.doc.id,
    //      gigArtistName: doc.payload.doc.data()['gigArtistName'],
    //      gigDescription: doc.payload.doc.data()['gigDescription'],
    //      gigVenueName: doc.payload.doc.data()['gigVenueName'],
    //      gigDate: doc.payload.doc.data()['gigDate'],
    //      gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
    //      gigPunterCount: doc.payload.doc.data()['gigPunterCount']
    //      };
    //    });
    //  })
    //  )
    //  .subscribe((Gig: Gigs[]) => {
    //  this.availableGigs =  Gig;
    //  this.gigsChanged.next([...this.availableGigs]);
    //  });




    // this.db.firestore.collection('gigs').where('gigArtistName', '==', 'DJ')
    // .snapshotChanges()
    // .pipe(map(docData => {
    //  return docData.map(doc => {
    //   return {
    //      id: doc.payload.doc.id,
    //      gigArtistName: doc.payload.doc.data()['gigArtistName'],
    //      gigDescription: doc.payload.doc.data()['gigDescription'],
    //      gigVenueName: doc.payload.doc.data()['gigVenueName'],
    //      gigDate: doc.payload.doc.data()['gigDate'],
    //      gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
    //      gigPunterCount: doc.payload.doc.data()['gigPunterCount']
    //      };
    //    });
    //  })
    //  )
    //  .subscribe((Gig: Gigs[]) => {
    //  this.filteredGigs =  Gig;
    // // this.gigsChanged.next([...this.availableGigs]);
    //  });



 // }

}
