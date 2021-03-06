import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authSvcEndpoint: string = environment.authSvcEndpoint;
  token: string;
  userId: string;
  constructor(private httpClient: HttpClient) {
    
  }
  //setting member userid
  setUserId(userId: string) {
    this.userId = userId;
  }
  //get the member userid value
  getUserId() {
    return this.userId;
  }

  //service method call to register new user
  registerUser(user: User) {
    return this.httpClient.post(this.authSvcEndpoint + "/registeruser", user).pipe(
      catchError(this.handleError));
  }

  //service method call to check user is authenticated
  loginUser(user: User) {
    return this.httpClient.post<string>(this.authSvcEndpoint + "/login", user).pipe(
      catchError(this.handleError));
  }

  //set the jwt token in localstorage
  setToken(token: string) {
    return localStorage.setItem(TOKEN_NAME, token);
  }

  //get the token from localstorage
  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  removeToken() {
    return localStorage.removeItem(TOKEN_NAME);
  
  }
  //method to check whether token expired
  isTokenExpired(token?: string) {
    if (!token) token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined || date === null) return false;
    return !(date.valueOf() > new Date().valueOf())
  }

  //method to get the token expiration date
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

