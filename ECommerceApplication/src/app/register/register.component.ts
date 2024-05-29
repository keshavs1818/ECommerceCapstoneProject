import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router:Router, private http:HttpClient) {}
  reg_username:string;
  reg_password:string;

  payLoadUser:any;

  error_msg:string;
  is_error:boolean = false;
  onSubmit(): any {
    this.payLoadUser = {"username":this.reg_username, "password":this.reg_password}
    this.http.post('http://localhost:8080/createUser', this.payLoadUser).subscribe(
      (response)=>{
        // successfully create user
        console.log(response);
        this.is_error = false;
        this.router.navigate(['/login']);
      },
      (error)=>{
        console.log(error);
        this.is_error = true;
        this.error_msg = "Not able to create user, try again"
      });
  }
}
