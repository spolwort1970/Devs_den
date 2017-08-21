import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {GetStartedComponent} from '../get-started/get-started.component';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {


  roleType: GetStartedComponent;

  name: String;
  username: String;
  email: String;
  password: String;
  role: String;
  
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onInput($event) {
    // $event.preventDefault();
    // console.log("selected: " + $event.target.value);
    // console.log(this.role);
  }


  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.roleType.role
    };

    console.log(user);

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      alert("Please fill in all fields");
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      alert("Please use a valid email");
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        alert("Registered");
        this.router.navigate(["/login"]);
      } else {
        alert("Invalid User");
        this.router.navigate(["/register"]);
      }
    });
  }
}
