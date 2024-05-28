import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[HttpClient]
})
export class AppComponent {
  constructor(private http:HttpClient){}
  title = "Welcome to the eCommerce Application page. Click to get started.";
  username:any;
  password:any;

  payLoadUser: any;

  reg_username:any;
  reg_password:any;

  loginDetails:any[] = [];
  error_msg:any;
  welcome_msg:any;
  validLogin:boolean = true;
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
    this.http.post('http://localhost:8080/authenticate', this.payLoadUser).subscribe (
      (response)=> {
        console.log("Token: ", response);

      },
      (error)=>{
        console.log("Error: ", error);
        this.error_msg = "Login failed";
        this.validLogin = false;
    });
  }

  // private urlCreateUser = 'http://localhost:8080/createUser';

  // createUser(user:any)
  // {
  //   return this.http.post(this.urlCreateUser, user);
  // }
}
