import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Subscription} from 'rxjs';
import { Gigs } from './gigModel';
import { User } from './auth/user.model';


@Injectable({
  providedIn: 'root'
})

export class GigService {

  private fbSubs: Subscription[] = [];
  private availableGigs: Gigs[] = [];
  gigsChanged = new Subject<Gigs[]>();


  constructor(private db: AngularFirestore) { }

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

  this.db.collection('gigs').doc(gigID).collection('interestedUsers').add({userID});
  //   const setWithMerge = gigRef.set({ userID }
  // , { merge: true });

  //   this.db.collection('gigs').add(setWithMerge);

  }

  addGig(gig: Gigs) {
    this.db.collection('gigs').add(gig);
  }

}

