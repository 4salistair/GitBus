import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle =  new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authServices: AuthService) { }

  ngOnInit() {

    this.authSubscription = this.authServices.authChange.subscribe(authStatus => {

      this.isAuth = authStatus;

    });
  }

  onToggleSidenav() {

    this.sideNavToggle.emit();

  }

  onLogout() {
    this.authServices.logout();
  }

  ngOnDestroy() {

    this.authSubscription.unsubscribe();
  }

}
