import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[HttpClient]
})
export class AppComponent {
  constructor(private http:HttpClient, private router:Router){}
  ngOnInit() {
    this.router.navigate['/login'];
  }
  title = "Welcome to the eCommerce Application page. Login to get started shopping.";
  username:any;
  password:any;
  reg_username:any;
  reg_password:any;
  loginDetails:any[] = [];
  error_msg:any;
  welcome_msg:any;
}

