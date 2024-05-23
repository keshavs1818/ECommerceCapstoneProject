import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Welcome to the eCommerce Application page. Click to get started.";
  username:any;
  password:any;
  reg_username:any;
  reg_password:any;
  loginDetails:any[] = [];
  error_msg:any;
  welcome_msg:any;
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
}
