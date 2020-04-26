import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gig-details',
  templateUrl: './gig-details.component.html',
  styleUrls: ['./gig-details.component.css']
})

export class GigDetailsComponent  {
  // ngOnInit(): void {
  //   throw new Error("Method not implemented.");
  // }

  constructor(@Inject(MAT_DIALOG_DATA) public passData: any) { }

}

