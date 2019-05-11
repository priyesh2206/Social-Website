import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData} from './auth-data.model';
import { Subject } from 'rxjs';
import { environment} from '../../environments/environment';
const BACKEND_URL = environment.apiUrls + '/user/';


@Injectable({ providedIn: 'root' })

export class AuthService {
  private token: string;
  private TokenTImer: any;
  private IsAuthenticated = false;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient , private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.IsAuthenticated;
  }

getuserId() {
  return this.userId;
}

  getAuthStatusListener() {
  return this.authStatusListener.asObservable();
  }

 createUser(email: string , password: string ) {
   const authData: AuthData = {email: email , password: password };
   this.http.post(BACKEND_URL + '/signup', authData)
   .subscribe(() => {
     this.router.navigate(['/']);
  }, error => {
    this.authStatusListener.next(false);
  });
 }

 login(email: string , password: string ) {
  const authData: AuthData = {email: email , password: password };
  this.http.post<{token: string , expiresIn: number , userId: string}>(BACKEND_URL + '/login', authData)
  .subscribe(response => {
    const token = response.token;
    this.token = token;
    if (token) {
      const expiresInDuration = response.expiresIn;
     this.SetAuthTime(expiresInDuration);
      this.IsAuthenticated = true;
      this.userId = response.userId;
    this.authStatusListener.next(true);
    const now = new Date;
    const expirationdate = new Date (now.getTime() + expiresInDuration * 1000);
     this.SaveAuthData(token, expirationdate , this.userId );
     console.log(expirationdate);
    this.router.navigate(['/']);
    }
  }, error => {
    this.authStatusListener.next(false);
  });
 }

AutoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationdate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.IsAuthenticated = true;
    this.userId = authInformation.userId;
    this.SetAuthTime(expiresIn / 1000);
    this.authStatusListener.next(true);
  }

}
 onlogout() {
   this.token = null;
   this.IsAuthenticated = false;
   this.authStatusListener.next(false);
   this.userId = null;
   clearTimeout(this.TokenTImer);
   this.ClearAuthData();
   this.router.navigate(['/']);
 }


private SaveAuthData (token: string , expirationdate: Date , userId: string) {
 localStorage.setItem('token', token);
 localStorage.setItem('expiration', expirationdate.toISOString());
 localStorage.setItem('userId', userId);
}

private SetAuthTime(duration: number) {
  console.log('setting time:' + duration);
  this.TokenTImer = setTimeout(() => {
    this.onlogout();
 }, duration * 1000);
}


private ClearAuthData () {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
}
private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationdate = localStorage.getItem('expiration');
  const userId = localStorage.getItem('userId');
  if (!token || !expirationdate) {
    return;
  }
  return {
    token: token,
    expirationdate: new Date(expirationdate),
    userId: userId
  };
}
}
