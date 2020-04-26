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

  selector: 'app-gig-add',
  templateUrl: './gig-add.component.html',
  styleUrls: ['./gig-add.component.css']

})

export class GigAddComponent implements OnInit {

    ngOnInit() {


    }

//  private gigObservible: Observable<Gigs[]>;

//   totalVote = 0;
//   totalrunningPrice = 10;

//   thisGig: Gigs;
//   fieldToUpdateAndValue: JSON;
//   selector: 'date-pipe';

//   constructor(private Gigservice: GigService,
//               private db: AngularFirestore,
//               private dialog: MatDialog) { }


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

//     private addDataToDatabase(addGig: any) {
//       this.db.collection('gigs').add(addGig);
//     }

}
