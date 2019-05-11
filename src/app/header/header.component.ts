import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-header',
  templateUrl:  './header.component.html',
  styleUrls: ['./header.component.css']
})


export  class  HeaderComponent implements OnInit, OnDestroy {
 IsUserAuthenicated = false;
private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

ngOnInit() {
  this.IsUserAuthenicated = this.authService.getIsAuth();
 this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
  this.IsUserAuthenicated = isAuthenticated;
 });

}
onlogout() {
  this.authService.onlogout();
}

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();

}

}

