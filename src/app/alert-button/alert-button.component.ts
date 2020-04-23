import { Component, Inject, OnInit, OnChanges, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Gigs } from '../gigModel';
import { GigService } from '../gigService';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { GigDetailsComponent } from '../gig-details/gig-details.component';


@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})

export class AlertButtonComponent implements OnInit {

 private gigObservible: Observable<Gigs[]>;

  totalVote = 0;
  totalrunningPrice = 10;

  thisGig: Gigs;
  fieldToUpdateAndValue: JSON;
  selector: 'date-pipe';

  constructor(private Gigservice: GigService,
              private db: AngularFirestore,
              private dialog: MatDialog) { }



  ngOnInit() {


  this.gigObservible = this.db.collection('gigs')
  .snapshotChanges()
  .pipe(map( docArray => {
      return docArray.map( doc => {
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

  }));


  // this.gigObservible.subscribe( result => { console.log('Rusult Object from datastore ' + result); });

  }

  signUp(gig: Gigs) {

    this.dialog.open(GigDetailsComponent);

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
    this.thisGig.gigTotalPrice = 0;
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

}
