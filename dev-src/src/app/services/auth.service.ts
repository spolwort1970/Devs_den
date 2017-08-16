import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  dev: any;

  constructor(private http:Http) { }

  registerDev(dev) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/devs/register', dev, {headers: headers})
      .map(res => res.json());
  }

  authenticateDev(dev) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/devs/authenticate', dev, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);    
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/devs/profile', { headers: headers })
      .map(res => res.json());
  }

  getDashboard() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/devs/dashboard', { headers: headers })
      .map(res => res.json());
  }

  storeDevData(token, dev) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('dev', JSON.stringify(dev));
    this.authToken = token;
    this.dev = dev;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.dev = null;
    localStorage.clear();
  }

}
