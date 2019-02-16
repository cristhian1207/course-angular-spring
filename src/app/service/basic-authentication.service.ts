import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username, password){
    // console.log('before ' + this.isUserLoggedIn());
    if((username === 'in28minutes') && (password === 'dummy')){
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      // console.log('after ' + this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  executeBasicAuthenticationService(username, password){
    let basicAuthHeaderString = `Basic ${window.btoa(username + ':' + password)}`;
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthenticationBean>(`${API_URL}/basic-auth`,{
      headers
    }).pipe(
      map(
        response => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return response;
        }
      )
    );
  }

  executeJwtAuthenticationService(username, password){
    
    return this.http.post<any>(`${API_URL}/authenticate`,{
      username,
      password
    }).pipe(
      map(
        response => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);
          return response;
        }
      )
    );
  }
}

export class AuthenticationBean {
  constructor(public message: string){}
}
