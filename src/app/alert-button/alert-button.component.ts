import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})
export class AlertButtonComponent implements OnInit {

  totalVote = 0;
  totalPrice = 250;
  totalrunningPrice = 0;

  gigDescription: string;
  gigVenueName: string;
  gigArtistName: string;
  gigDate: Date;


  constructor() { }

  ngOnInit() {

   // this.totalVote = 0;
    console.log(this.totalVote);
  }

  Total() {
    this.totalrunningPrice =  this.totalPrice + this.totalVote;
    console.log(this.totalrunningPrice);
    return this.totalrunningPrice;
  }
  upVotes() {
    this.totalVote++;
    console.log(this.totalVote);

    this.totalrunningPrice =  this.totalPrice / this.totalVote;
    console.log(this.totalrunningPrice);

    return this.totalVote;

  }

  Reset() {
    console.log('Reset');
    this.totalVote = 0;
    this.totalPrice = 250;
    this.totalrunningPrice = 900;

  }


    onSubmit(form: NgForm) {

      console.log(form.value.gigDescription);
      console.log(form.value.gigVenueName);
      console.log(form.value.gigArtistName);
      console.log(form.value.gigDate);


      this.gigDescription = form.value.gigDescription;
      this.gigVenueName = form.value.gigVenueName;
      this.gigArtistName = form.value.gigArtistName;
      this.gigDate = form.value.gigArtistName;


    }
}
