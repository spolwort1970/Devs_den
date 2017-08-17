import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-get-started",
  templateUrl: "./get-started.component.html",
  styleUrls: ["./get-started.component.css"]
})
export class GetStartedComponent implements OnInit {
  role: String;

  constructor(private router: Router) {}

  ngOnInit() {}

  setDev() {
    this.role = "Developer";
    this.router.navigate(["/register"]);
  }

  setEmp() {
    this.role = "Employer";
    this.router.navigate(["/register"]);    
  }
}
