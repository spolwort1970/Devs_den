import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
// Navigation Components
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
// User Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";

// Deprecated Components
import { EmpRegisterComponent } from './components/emp-register/emp-register.component';
import { EmpLoginComponent } from './components/emp-login/emp-login.component';
import { EmpProfileComponent } from './components/emp-profile/emp-profile.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'getstarted', component: GetStartedComponent},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'empregister', component: EmpRegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'emplogin', component: EmpLoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'empprofile', component: EmpProfileComponent, canActivate: [AuthGuard]},
  {path: 'editprofile', component: EditProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    // Navigation Modules
    HomeComponent,
    NavbarComponent,
    // User Modules
    DashboardComponent,
    AboutComponent,

    GetStartedComponent,
    RegisterComponent,
    EmpRegisterComponent,
    LoginComponent,
    EmpLoginComponent,
    ProfileComponent,
    EmpProfileComponent,
    GetStartedComponent,
    EditProfileComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
