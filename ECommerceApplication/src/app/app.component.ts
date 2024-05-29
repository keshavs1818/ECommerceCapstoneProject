import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Welcome to the eCommerce Application page. Login to get started shopping.";
  username:any;
  password:any;
  reg_username:any;
  reg_password:any;
  loginDetails:any[] = [];
  error_msg:any;
  welcome_msg:any;
}
