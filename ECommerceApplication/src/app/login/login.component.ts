import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http:HttpClient, private router:Router, private authService: AuthService){}
  title = "Welcome to the eCommerce Application page. Click to get started.";
  username:any;
  password:any;

  payLoadUser: any;

  loginDetails:any[] = [];
  error_msg:any;
  welcome_msg:any;
  validLogin:boolean = true;

  hide = true;


  function() {
    this.error_msg = "Username and password isn't established. Please register if you're a newcomer. Thank you.";
  }
  isUserValid(): boolean {
    console.log(this.loginDetails.includes(this.username) && this.loginDetails.includes(this.password));
    return this.loginDetails.includes(this.username) && this.loginDetails.includes(this.password);
  }

  modifyObjectArr(): void {
    this.loginDetails.push(this.username);
    this.loginDetails.push(this.password);
  }

  welcomeMessage() {
    this.welcome_msg = "Welcome " + this.username;
  }

  loginAction(): any {
    this.payLoadUser = {"username": this.username, "password":this.password
    }
    this.http.post<{token: string, role:string}>('http://localhost:8080/authenticate', this.payLoadUser).subscribe (
      (response)=> {
        console.log(response);
        this.validLogin = true;
        // stores token in client memory
        this.authService.setAuthHeaders(response.token);
        this.authService.setAuthRole(response.role);
        // routes to home page
        this.router.navigate(['/home']);
      },
      (error)=>{
        // logging error message
        console.log("Error: ", error);
        this.error_msg = "Login failed";
        this.validLogin = false;
    });
  }

}


