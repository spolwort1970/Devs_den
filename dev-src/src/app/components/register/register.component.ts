import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const dev = {
      isDev: true,
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(! this.validateService.validateRegister(dev)) {
      alert('Please fill in all fields');
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(dev.email)) {
      alert('Please use a valid email');
      return false;
    }

    // Register dev
    this.authService.registerDev(dev).subscribe(data => {
      if(data.success) {
        alert('Registered');
        this.router.navigate(['/login']);
      } else {
        alert('Invalid User');
        this.router.navigate(['/register']);
      }
    });
  }
}
