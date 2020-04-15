import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Subscription} from 'rxjs';
import { Gigs } from './gigModel';


@Injectable({
  providedIn: 'root'
})

export class GigService {

  private fbSubs: Subscription[] = [];
  private availableGigs: Gigs[] = [];
  gigsChanged = new Subject<Gigs[]>();

  constructor(private db: AngularFirestore,
              ) { }



fetchGigs() {
this.fbSubs.push(this.db
       .collection('gigs')
       .snapshotChanges()
       .pipe(map(docData => {

        return docData.map(doc => {
         return {
             id: doc.payload.doc.id,
//              name: doc.payload.doc.data()['gigTotalPrice'],
//           duration: doc.payload.doc.data()['duration'],
//           calories: doc.payload.doc.data()['calories'],
          };
     });
   })
    )
    .subscribe((Gig: Gigs[]) => {
      this.availableGigs =  Gig;
      this.gigsChanged.next([...this.availableGigs]);
      // gigschanged.next([...this.availableExercises]);
     }, error => {
       console.log('Fetching Gigs Failed');
 //     this.uiservice.showSnackbar('Fetching Gigs Failed', null, 3000);
       }));
      }
    }

