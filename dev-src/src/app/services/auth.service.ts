import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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

  storeDevData(token, dev) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('dev', JSON.stringify(dev));
    this.authToken = token;
    this.dev = dev;
  }

  logout() {
    this.authToken = null;
    this.dev = null;
    localStorage.clear();
  }

}
