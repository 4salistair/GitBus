import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;
  constructor(private authServices: AuthService) { }



  ngOnInit() {

    this.authSubscription = this.authServices.authChange.subscribe( authStatus => {

      this.isAuth = authStatus;

    } );


  }

  OnClose() {

    this.closeSidenav.emit();

  }
  OnLogout() {
  this.OnClose();
  this.authServices.logout();
  }

  ngOndestroy() {
    this.authSubscription.unsubscribe();
  }
}

