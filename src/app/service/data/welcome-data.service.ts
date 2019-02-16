import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  createBasicAuthenticationHttpHeader(){
    let username = 'in28minutes';
    let password = 'dummy';
    let basicAuthHeaderString = `Basic ${window.btoa(username + ':' + password)}`;
    return basicAuthHeaderString;
  }

  executeHelloWorldService(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    // console.log('Execute hello world bean service');
  }

  executeHelloWorldServiceWithPathVariable(name){
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,{
      headers
    });
  }
}

export class HelloWorldBean {
  constructor(public message: string){ }
}
