import { Component, Inject, OnInit, OnChanges, Input } from '@angular/core';
import { GigService } from '../gigService';
import { Subscription } from 'rxjs';
import { Gigs } from '../gigModel';

import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms/src/directives/ng_form';

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

  private allGigs: Subscription;
  private availableGigs: Gigs[] = [];
  private  gigMapArray: Gigs;

  constructor(private gigService: GigService)  { }
  ngOnInit() {

    this.allGigs = this.gigService.gigsChanged.subscribe(
      availableGigs => ( this.availableGigs = availableGigs ));
    console.log(this.availableGigs);
  }


  onSubmit(form: NgForm) {
   this.gigMapArray = {

            gigArtistName: form.value.gigArtistName,
            gigDate: form.value.gigDate,
            gigDescription: form.value.gigDescription,
            gigVenueName: form.value.gigVenueName,
            gigPunterCount: 0,
            gigRunningCostPerPunter: form.value.gigTotalPrice,
            gigTotalPrice: form.value.gigTotalPrice,

            };

   this.gigService.addGig(this.gigMapArray);

  }

}
