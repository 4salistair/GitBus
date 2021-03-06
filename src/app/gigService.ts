import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { map, switchMap} from 'rxjs/operators';
import { Subscription, of} from 'rxjs';
import { Gigs } from './gigModel';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from './auth/user.model';
import { Observable } from 'rxjs/Observable';
import { throwMatDuplicatedDrawerError } from '@angular/material';
import { UIservice } from './UIservice';
import 'rxjs/add/operator/toPromise';
import { and, waitForMap } from '@angular/router/src/utils/collection';
import { bloomAdd } from '@angular/core/src/render3/di';
//  import { async } from 'rxjs/internal/scheduler/async';


@Injectable({
  providedIn: 'root'
})

export class GigService {

  count: 0;


  private availableGigs: Gigs[] = [];
  gigsChanged = new Subject<Gigs[]>();

  isAlreadySubject = new Subject <Gigs[]>();

  private filteredGigs: Gigs[] = [];
  filteredGigsChanged = new Subject<Gigs[]>();

  id: string;

  gigsAndPuntersChanged = new Subject<Gigs[]>();
  
  authSubscription: Subscription;
  gigSubscription: Subscription;

  isOnBus: boolean;
  isOnBusChanged = new Subject<boolean>();

  isOnBusoutcome: boolean;
  //
 // gigsforPunter = new 
  // private punterGigs: Gigs[] = [];
 // hasRecords: boolean;
  //

  userID: string;
  userIDcarry: string;

  private runningGigs: Gigs;
  private punterGigs: Gigs;
  private incrementGigs: Gigs;

  constructor(private db: AngularFirestore,
              private authServices: AuthService,
              private uiService: UIservice
              ) {


                this.authServices.getUserID();

                this.authSubscription = this.authServices.currentUser.subscribe(
                   userID => {(userID = userID);
                              this.userID = userID; });
              }

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
            gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter'],
            gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
            gigID: doc.payload.doc.id
            };
          });
        })
        )
        .subscribe((Gig: Gigs[]) => {
        this.availableGigs =  Gig;
        this.gigsChanged.next([...this.availableGigs]);
        });

  }

  fetchGigsForCurrentUser() {

    this.authServices.getUserID();

    this.authSubscription = this.authServices.currentUser.subscribe(
       userID => {(userID = userID);
                  this.userID = userID;
                  const filter = this.db.collection('puntersGigs', ref => ref.where('userid', '==', userID ));

                  filter
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
         gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
         giguserID: doc.payload.doc.data()['userid'],
         gigID: doc.payload.doc.data()['gigID'],
         gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter']
         };
       });
     })
     )
     .subscribe((filteredGigs: Gigs[]) => {
     this.filteredGigs =  filteredGigs;
     this.filteredGigsChanged.next([...this.filteredGigs]);
     });
   });
}

  registerForGig(userID: string, gigID: string ) {
  this.db.collection('gigs').doc(gigID).collection('interestedUsers').add({userID , gigID});
  }

  addGig(gig: Gigs) {
    this.db.collection('gigs').add(gig);
  }

 

  puntersGigs(gigID: string) {

    this.punterGigs = this.availableGigs.find(
       ex => ex.id === gigID
    );



    this.authServices.getUserID();
    this.authSubscription = this.authServices.currentUser.subscribe(
     userID => {(userID = userID);
                this.userID = userID;
              });
   
  // tslint:disable-next-line: no-unused-expression

    if (this.userID) {
                      this.db.collection('puntersGigs').add({
                      ...this.punterGigs,
                      userid: this.userID
                      });
           //       this.uiService.showSnackbar('Get on it ya fooker', null, 3000)
                    }
                  
  }


  myGig(currentUserID: string ) {
    // tslint:disable-next-line: max-line-length
    currentUserID = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4ODQ4YjVhZmYyZDUyMDEzMzFhNTQ3ZDE5MDZlNWFhZGY2NTEzYzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2lnYnVzLTRmMGI1IiwiYXVkIjoiZ2lnYnVzLTRmMGI1IiwiYXV0aF90aW1lIjoxNTg4MzE5NzM4LCJ1c2VyX2lkIjoiN3EzQWVFbGE5c2dKTEY3QVNkSmx1QkRHS2lmMSIsInN1YiI6IjdxM0FlRWxhOXNnSkxGN0FTZEpsdUJER0tpZjEiLCJpYXQiOjE1ODgzMTk3MzgsImV4cCI6MTU4ODMyMzMzOCwiZW1haWwiOiIxMjM0NUAxMjMuMTIzIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzQ1QDEyMy4xMjMiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.d7JOqLvsRRTCIV05qOqIPwbceBBJagPkRfTY49Yy5i8wb3vK0JX_8GP3qdb8KhBuXxYyyOVEx-kVyKAfrweB994HH-C1rONrwE_giX7-shXh-nq49GNYHYbhtHB8lXe0Tev7pZ1P2hvEHFSJYWSgHfaMj4UsZl-t0ulcvCibz6L2RRTSMi9m0Xtq03Agw_zN0hiH9iOWJNt1Qr0ppCHqKqfbY3oclFYI-O4ND1Ys0cWPpbhlcgAk05TLjey5Z88ygW231foBZh08ikTCbIYJLk7tOF5a7I2Tcg6lQZkAH9JxxhbShN3nlMyvu8cGu2TxNSaq2utsROgmoZtuo913UA';
  }

  totalPunterIncrement(gigID: string) {

    this.incrementGigs = this.availableGigs.find(
      ex => ex.id === gigID
   );


    const punterCount = this.incrementGigs.gigPunterCount ++;



    this.db.collection('gigs')
     .doc(gigID)
     .set({ gigPunterCount: punterCount }, { merge: true });

    }

     runningCostDecrement(gigID: string) {

      this.runningGigs = this.availableGigs.find(
        ex => ex.id === gigID
     );

      const runningCost = this.runningGigs.gigTotalPrice / this.runningGigs.gigPunterCount ;

      

      this.db.collection('gigs')
        .doc(gigID)
        .set({ gigRunningCostPerPunter: runningCost }, { merge: true });

  }

///
  isAlready(gigID: string) {
   // console.log('gigID in isAlready function ' + gigID);


    this.fetchGigsForCurrentUser();

    // if (this.filteredGigs) {
    //     this.isAlreadySubject.next(true);
    //   } else {
    //     this.isAlreadySubject.next(false);
    //   }

}

///
getAllGigsForAllPunters() {
  this.db.collection('puntersGigs')
  .valueChanges()
  .subscribe((gigs: Gigs[]  ) => {
   this.isAlreadySubject.next(gigs);
  });
}


punterAlreadyonGig( gigID: string) {




  const filter = this.db.collection('puntersGigs', ref => ref.where('userid', '==', this.userID)
                                                             .where('gigID', '==', gigID )
              );

  filter
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
     gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
     giguserID: doc.payload.doc.data()['userid'],
     gigID: doc.payload.doc.data()['gigID']
     };
   });
 })
 )
 .subscribe((filteredGigs: Gigs[]) => {
 this.filteredGigs =  filteredGigs;

 if ( this.filteredGigs.length > 0) {
    console.log(this.filteredGigs);
    // console.log('already selected by user');
    // console.log(gigID);
    // console.log(this.filteredGigs[0].gigArtistName);
    this.isOnBusChanged.next(true);
    this.isOnBusoutcome = true;
 } else {
    console.log(this.filteredGigs);
    // console.log('not selected by user');
    // console.log(gigID);
    this.isOnBusChanged.next(false);
    this.isOnBusoutcome = false;
}

 });


  return true;
}


deleteGigForPunter(id) {

  this.db.collection('puntersGigs').doc(id).delete();

}

//

                                                            // this.authServices.getUserID();


                                                              // where('userid', '==', userID

//   return this.db.collection('puntersGigs', ref => ref.where('gigID', '==', gigID))
                    

//                       .snapshotChanges()
//                       .pipe(map(docData => {
//                        return docData.map(doc => {
//                         return {
//                            id: doc.payload.doc.id
//                           };
//                         });
//                       })
//                       );

// }


 



 // }
                      //          return this.hasRecords;
  //               filter
  // .
  // snapshotChanges()
  // .pipe(map(docData => {
  //  return docData.map(doc => {
  //   return {
  //      id: doc.payload.doc.id,
  //      gigArtistName: doc.payload.doc.data()['gigArtistName'],
  //      gigDescription: doc.payload.doc.data()['gigDescription'],
  //      gigVenueName: doc.payload.doc.data()['gigVenueName'],
  //      gigDate: doc.payload.doc.data()['gigDate'],
  //      gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
  //      gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
  //      giguserID: doc.payload.doc.data()['userid'],
  //      gigID: doc.payload.doc.data()['gigID']
  //      };
  //    });
  //  })
  //  )
  //  .subscribe((filteredGigs: Gigs[]) => {
  //  this.filteredGigs =  filteredGigs;
  //  this.filteredGigsChanged.next([...this.filteredGigs]);
  //  });

// });







//   this.fetchGigsForCurrentUser();

//   setTimeout(() => {
//     console.log(this.filteredGigs);
//   }, 1500);



//   this.gigSubscription = this.filteredGigsChanged.subscribe(
//        filteredGigs => { this.filteredGigs = filteredGigs; } );

//   console.log(this.filteredGigs);
// }
///

   // this.authServices.getUserID();

    // this.authSubscription = this.authServices.currentUser.subscribe(
    //        userID => {(userID = userID);
    //                 this.userID = userID;
    //                 const filter = this.db.collection('puntersGigs', ref => ref.where('userid', '==', '7q3AeEla9sgJLF7ASdJluBDGKif1' ));

    //                 filter
  //      .snapshotChanges()
  //      .pipe(map(docData => {
  //      return docData.map(doc => {
  //      return {
  //         id: doc.payload.doc.id,
  //        gigArtistName: doc.payload.doc.data()['gigArtistName'],
  //        gigDescription: doc.payload.doc.data()['gigDescription'],
  //        gigVenueName: doc.payload.doc.data()['gigVenueName'],
  //        gigDate: doc.payload.doc.data()['gigDate'],
  //        gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
  //        gigPunterCount: doc.payload.doc.data()['gigPunterCount']
  //        };
  //      });
  //    })
  //    )
  //    .subscribe((filteredGigs: Gigs[]) => {
  //    this.filteredGigs =  filteredGigs;
  //    this.filteredGigsChanged.next([...this.filteredGigs]);
  //    });
  //  });



  }





  // console.log('delay ' + punterCount);
   // this.signUp(gig);
       // Not sure I need this!!!

    // if (gig.gigPunterCount == NaN) {
    //   gig.gigPunterCount = 0;
    //   console.log('if null set to 0');
    // }

   //    duration: this.runningExercise.duration * (progress / 100),
    //    calories: this.runningExercise.calories * (progress / 100),
    //    date: new Date(),
    //    state: 'cancalled'});
    //  this.runningExercise = null;
    //  this.exerciseChanged.next(null);


  // filterByLocation(location: string|null) {
  //  // this.locationFilter$.next(location);
  // }
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


// gigsForPunter( ) {
//   this.authServices.getUserID();

//   this.authSubscription = this.authServices.currentUser.subscribe(
//     userID => { (this.userID = userID);
//               //  this.myGig(userID);
//                 this.userIDcarry = userID;


//                 const filteredGigs = this.db.collectionGroup('interestedUsers', ref => ref.where('userID', '==', userID));
//                 filteredGigs.snapshotChanges()
//                 .pipe(map(docArray => {
//                  return docArray.map(doc => {
//                   return {
//                     id: doc.payload.doc.id,
//                     userID: doc.payload.doc.data()['userID'],
//                     gigID: doc.payload.doc.data()['gigID']
//                 };
//                });
//              })).subscribe((gigAndPunters: any[]) => {
//              this.gigsAndPunters = gigAndPunters;
//              this.gigsAndPuntersChanged.next([...this.gigsAndPunters]);
//               });
//     });

  
//   }

  // ?? 

   //  this.count = 0;
    
     
    //  this.authServices.getUserID();
    //  this.authSubscription = this.authServices.currentUser.subscribe(
    //     userID => { (this.userID = userID);
    //                 console.log(this.userID);
    //                 this.NEWlookUpMyGigs(this.userID);
                  // });
      //  }

      // NEWlookUpMyGigs(userID: string) {

      //   const filteredGigs = this.db.collection('puntersGigs', ref => ref.where('userID', '==', userID.substring(0, 50)));
      //   filteredGigs
      //   .snapshotChanges()
      //   .pipe(map(docData => {
      //    return docData.map(doc => {
      //     return {
      //        id: doc.payload.doc.id,
      //        gigArtistName: doc.payload.doc.data()['gigArtistName'],
      //        gigDescription: doc.payload.doc.data()['gigDescription'],
      //        gigVenueName: doc.payload.doc.data()['gigVenueName'],
      //        gigDate: doc.payload.doc.data()['gigDate'],
      //        gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
      //        gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter'],
      //        gigPunterCount: doc.payload.doc.data()['gigPunterCount']
      //        };
      //      });
      //    })
      //    )
      //    .subscribe((Gig: Gigs[]) => {
      //    this.avalablefilteredGigs =  Gig;
  
      //   // this.gigsChanged.next([...this.availableGigs]);
      //    });
      // }


      // lookUpMyGigs(userID: string) {

      // const filteredGigs = this.db.collection('puntersGigs', ref => ref.where('userID', '==', userID.substring(0, 50)));
      // this.gigsAndPunters = filteredGigs.snapshotChanges()
      //              .pipe(map(docArray => {

      //               console.log(docArray);
      //               // docArray.forEach(run => {
      //               //                          this.gigIDArray.push({ id : run.payload.doc.data()['gigID']});
      //               //                         });
      //               // this.getDataforMyGigCard(this.gigIDArray);


      //               return docArray.map(doc => {
      //               return {
      //               id: doc.payload.doc.id,
      //               userID: doc.payload.doc.data()['id'],
      //               gigArtistName: doc.payload.doc.data()['gigArtistName'],
      //               gigDescription: doc.payload.doc.data()['gigDescription'],
      //               gigVenueName: doc.payload.doc.data()['gigVenueName'],
      //               gigDate: doc.payload.doc.data()['gigDate'],
      //               gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
      //               gigPunterCount: doc.payload.doc.data()['gigPunterCount']
      //               };
      //               });
      //             }));

      // }

      // print(gigID: string ) {
      //   console.log(gigID);

      // }
  
   //   getDataforMyGigCard(gigIDs: Array<string>) {

   //  const gigsFiltersByIntrestedPunter = this.db.collection('gigs', ref => ref.where('gigID', '==', gigID));
   //    this.gigsForAPunter = gigsFiltersByIntrestedPunter.snapshotChanges() //'array-contains' gigIDs 
   // this.gigsForAPunter =

  // const gigs = this.db.collection('gigs');
   //gig. WhereArrayContains.
   // this.gigsForAPunter =
        // console.log(gigIDs);
//fK3ddutEpD2qQqRMXNW5').get()
      
        
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
        // )
        // .subscribe((gigs: Gigs[]) => {
        //    this.gigs = gigs;
        //    console.log(this.gigs);
        // });
       // this.gigsForAPunter
        //  {gigs => this.gigs = Gigs }
       // );

//         const gigIDArray = ['Liverpool', '2343455', '545546645'];

//         const gigsFromStore = this.db.collection('gigs', ref => ref.where( 'gigVenueName' , 'array-contains', ['Liverpool', '2343455', '545546645']));
// // 'array-contains', gigIDArray
//         gigsFromStore.snapshotChanges()
//                      .pipe(map(docData => {
//                        return docData.map(doc => {
//                      return {
//                             id: doc.payload.doc.id,
//                             gigArtistName: doc.payload.doc.data()['gigArtistName'],
//                             gigDescription: doc.payload.doc.data()['gigDescription'],
//                             gigVenueName: doc.payload.doc.data()['gigVenueName'],
//                             gigDate: doc.payload.doc.data()['gigDate'],
//                             gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
//                             gigPunterCount: doc.payload.doc.data()['gigPunterCount']
//                           };
//                           });
//                         })
//                       ).subscribe((gigs: Gigs[]) => {
//                             this.gigs = gigs;
//                             console.log(this.gigs);
//                            });


//// works to get back details from ID (where docID is  a string Var)

      //   this.db.collection('gigs').doc('i6BOgHnZk7j3yLYQkBwa').get()
      //  .subscribe(doc => { doc = doc;
      //                      console.log(doc.data().gigArtistName);
      //  });
      // }

        // .subscribe((exercises: Exercise[]) => {
        //   this.uiservice.loadingStateChagne.next(false);
        //   this.availableExercises = exercises;
        //   this.exercisesChanged.next([...this.availableExercises]);
        // }

// this.availableExercises = exercises;    
      //  console.log('Gigs for...' + this.gigsForAPunter.subscribe( doc=>{doc })); 
     
      //            console.log(this.gigsAndPunters);
      //   });


  //  this.gigsAndPuntersSub =  this.gigsAndPunters;
  //     this.gigsAndPuntersSub = this.gigService
  //                               .gigsAndPuntersChanged
  //                               .subscribe(puntersAndGigs => { puntersAndGigs = puntersAndGigs;
  //                                 pu
  //                               });
  //     this.gigService.gigsByPunters();
  //  }

    // this.exChangeSubscription = this.trainingService.finishedExercisesChanged.subscribe(
    //   (exercises: Exercise[]) => {
    //   this.dataSource.data = exercises;
    //   }





   // this.db.collection('gigs').valueChanges().subscribe(val => console.log(val));
   //  const Events = this.db.collection('gigs', ref => ref.where('gigArtistName', '==', 'DJ'));

   //  Events.valueChanges().subscribe(gigArray => console.log(gigArray));


//     // const Events2 = this.db.collectionGroup collection('gigs/XjURUlZIm3rHv6nVE514/interestedUsers/', ref => ref.where('UserID', '==', '2'));
//     // Events2.valueChanges().subscribe(gigArray => console.log(gigArray));

//     const Events2 = this.db.collectionGroup('interestedUsers', ref => ref.where('UserID', '==', '2'));
//     Events2.valueChanges().subscribe(gigArray => console.log(gigArray));

   
    
//  //  const Events2 = this.db.firestore.collection('interestedUsers').where('UserID', '==', '2')
//  //  Events2.onSnapshot valueChanges().subscribe(gigArray => console.log(gigArray));
 
 
//  //   this.db.firestore.collectionGroup('interestedUsers').where('UserID', '==', '2').get()
//  //  .then(queryDocumentSnapshot => {
//  //   queryDocumentSnapshot. forEach(doc => {
//  //      console.log(doc.id, ' => ', doc.data());
//  //    });
 
 
//    // });
 // }

 //  private gigObservible: Observable<Gigs[]>;

//   totalVote = 0;
//   totalrunningPrice = 10;

//   thisGig: Gigs;
//   fieldToUpdateAndValue: JSON;
//   selector: 'date-pipe';

// constructor(private Gigservice: GigService,
//             private db: AngularFirestore,
//           private dialog: MatDialog) { }


// Reset() {
//     console.log('Reset');
//     this.totalVote = 0;
//     this.thisGig.gigTotalPrice = 0;
//     this.totalrunningPrice = 0;

//   }


//     onSubmit(form: NgForm) {

//       console.log(form.value.gigDescription);
//       console.log(form.value.gigVenueName);
//       console.log(form.value.gigArtistName);
//       console.log(form.value.gigDate);
//       console.log(form.value.gigTotalPrice);

//      // WORKS BUT CAN'T GET IT USE A GIG TYPE TO UP DATE

//       const runningGig = {
//         gigDescription: form.value.gigDescription,
//         gigVenueName: form.value.gigVenueName,
//         gigArtistName: form.value.gigArtistName,
//         gigDate: form.value.gigDate,
//         gigTotalPrice: form.value.gigTotalPrice,
//         gigPunterCount: 0
//       };
//       this.addDataToDatabase(runningGig);
//     }

    // private addDataToDatabase(addGig: any) {
    //   this.db.collection('gigs').add(addGig);
    // }


