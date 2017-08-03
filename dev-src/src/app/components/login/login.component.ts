import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const dev = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateDev(dev).subscribe(data => {
      if(data.success) {
        this.authService.storeDevData(data.token, data.dev);
        alert('Success')
        this.router.navigate(['/dashboard'])
      } else {
        alert(data.msg);
        this.router.navigate(['/login']);
      }
    });
  }

}
