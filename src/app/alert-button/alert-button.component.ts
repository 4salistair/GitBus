import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})
export class AlertButtonComponent implements OnInit {

  totalVote = 0;
  totalPrice = 250;
  totalrunningPrice = 0;


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


  AddGig() {


  }


}
