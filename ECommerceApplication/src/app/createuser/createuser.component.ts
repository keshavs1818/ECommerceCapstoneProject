import { Component } from '@angular/core';
import { CreateUserService } from '../createuser.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css',
  providers:[CreateUserService, HttpClient]
})
export class CreateUserComponent {
  constructor(private createUserService:CreateUserService ,private http:HttpClient){}
  // Columns For Product Details
  id:any;
  username:any;
  password:any;
  email:any;
  address:any;
  role:any;

  // Name to Search From
  searchText:any;

  // Column To Sort
  column_to_sort:any;

  
  user:any;
  new_category:string;
  data = "userdetails";
  payLoadUser:any;
  cat_array = [];
  new_array = [];
  fileName="";
  cat_set = new Set();
  new_obj:object;
  filter_boolean:boolean;
  sort_boolean:boolean;
  temp_array = [...this.cat_array];
  new_count = 0;
  count = 0;
  asc_desc:any;
  message:any;

  sum:number;
  searchArray:any;
  searchBool:boolean;
  sortBool = true;
  

  maphash = {
    id: "id",
    username: "username",
    password: "password",
    email: "email",
    address: "address",
    role: "role",
  };

  sortBy(column_name:any, asc_desc:any) {
    const sortOrder = asc_desc === "Ascending" ? 1 : -1;
    this.temp_array.sort((a, b) => {
      if (a[column_name] < b[column_name]) {
        return -1 * sortOrder;
      } else if (a[column_name] > b[column_name]) {
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });

    console.log(this.temp_array);
  }
  add(category:string) {
    this.cat_set.add(category);
  }
  saveUser () 
  {
    this.payLoadUser = {'id': this.id, 'username': this.username, 'password': this.password, 'email': this.email, 'address': this.address, 'role': this.role};
    this.createUserService.createUser(this.payLoadUser).subscribe(data=>console.log(data));
    console.log("User updated");
  }
  removeUser() 
  {
    this.createUserService.deleteUser(this.id).subscribe(data=>console.log(data));
    console.log("User deleted");
  }
  searchUser () 
  {
    this.searchBool = true;
    this.createUserService.searchUser(this.searchText).subscribe(data=>{console.log(data); this.searchArray = data; });
    console.log("User found");
  }
  loadUsers()
  {
    this.createUserService.getUsers().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.user = data;
          this.temp_array = data;
          console.log("Users loaded", this.user);
        }
      },
    })
  }
  filterBy(category:string) {
    this.cat_array = this.temp_array.filter(item => item.category === category);
    this.filter_boolean = true;
  }
}

