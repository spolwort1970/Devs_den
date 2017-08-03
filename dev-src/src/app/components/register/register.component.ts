import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import {Router} from '@angular/router';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';

>>>>>>> Employer

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }
>>>>>>> Employer

  ngOnInit() {
  }

<<<<<<< HEAD
=======
  onRegisterSubmit() {
    const dev = {
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
        alert('Invalid Dev');
        this.router.navigate(['/register']);
      }
    });
  }
>>>>>>> Employer
}
