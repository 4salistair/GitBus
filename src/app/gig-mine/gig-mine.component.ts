import { Component, Inject, OnInit, OnChanges, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription, Observable} from 'rxjs';

@Component({

    selector: 'app-gig-mine',
    templateUrl: './gig-mine.component.html',
    styleUrls: ['./gig-mine.component.css']

  })

  export class GigMineComponent implements OnInit {


  UserDetails: any[];
  gigsAndPunters: Observable<any[]>;

  constructor( private db: AngularFirestore)  { }

    ngOnInit() {

     const Events2 = this.db.collectionGroup('interestedUsers', ref => ref.where('userID', '==', '2'));

     this.gigsAndPunters = Events2.snapshotChanges()
     .pipe(map(docArray => {
      return docArray.map(doc => {
       return {
         id: doc.payload.doc.id,
         userID: doc.payload.doc.data()['UserID'],
         gigID: doc.payload.doc.data()['gigID']
     };
    });
  }));

    }
  }




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