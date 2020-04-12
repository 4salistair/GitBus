import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Gigs } from '../gigModel';
import { GigService } from '../gigService';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})

export class AlertButtonComponent implements OnInit {

  gigObservible: Observable<Gigs[]>;

  totalVote = 0;
  totalrunningPrice = 0;

  thisGig: Gigs;
  // gigDescription: string;
  // gigVenueName: string;
  // gigArtistName: string;
  // gigDate: Date;
  // gigTotalPrice = 250;


  constructor(private Gigservice: GigService, private db: AngularFirestore
    ) { }

  ngOnInit() {

  this.Gigservice.fetchGigs();
  console.log(this.Gigservice.fetchGigs());


  this.gigObservible = this.db.collection('gigs')
  .snapshotChanges()
  .pipe(map( docArray => {
      return docArray.map( doc => {
      return {
        id: doc.payload.doc.id,
        gigArtistName: doc.payload.doc['gigArtistName'],
        gigDescription: doc.payload.doc['gigDescription'],
        gigVenueName: doc.payload.doc['gigVenueName'],
        gigDate: doc.payload.doc['gigDate'],
        gigTotalPrice: doc.payload.doc['gigTotalPrice']
      };
    });

  }));
  // .subscribe( result => {
  //    console.log(result);
  //   });


  }

  Total() {
    this.totalrunningPrice =  this.thisGig.gigTotalPrice + this.totalVote;
    console.log(this.totalrunningPrice);
    return this.totalrunningPrice;
  }
  upVotes() {
    this.totalVote++;
    console.log(this.totalVote);

    this.totalrunningPrice =  this.thisGig.gigTotalPrice / this.totalVote;
    console.log(this.totalrunningPrice);

    return this.totalVote;

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

      this.thisGig.gigArtistName = form.value.gigArtistName;
      this.thisGig.gigDescription = form.value.gigDescription;
      this.thisGig.gigVenueName = form.value.gigVenueName;
      this.thisGig.gigDate = form.value.gigDate;
      this.thisGig.gigTotalPrice = form.value.gigTotalPrice;

    }
}
