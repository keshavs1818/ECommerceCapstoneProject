import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CreateuserService } from '../createuser.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css',
  providers:[CreateuserService, HttpClient]
})
export class CreateuserComponent {
  constructor(private createuserService:CreateuserService ,private http:HttpClient){}
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

  options: string[] = ['ROLE_USER', 'ROLE_ADMIN'];
  user:any;
  new_category:string;
  data = "productdetails";
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
  cart_array = [];
  wish_array = [];
  disabled_cart = [];
  disabled_wish = [];
  sum:number;
  searchArray:any;
  searchBool:boolean;
  sortBool = true;
  selectedRole:any;
  counts: number[] = [];

  maphash = {
    id: "id",
    username: "username",
    password: "password",
    email: "email",
    address: "address",
    role: "role",
  };

  checkCart(index:number) {
    this.disabled_cart[index] = !(this.counts[index] > 0);
  }
  checkWish(index:number) {
    this.disabled_wish[index] = !(this.counts[index] > 0);
  }
  updateSum(num:number) {
    this.sum += num;
  }
  updateAdd(id:number, username:any, password:any, email:any, address:any, role:any, count:any) {
    this.new_obj = {a: id, b: username, c: password, d: email, e: address, f: role};
    this.cart_array.push(this.new_obj);
    localStorage.setItem("cart", JSON.stringify(this.cart_array));
    console.log(this.cart_array);
  }
  updateWish(id:number, username:any, password:any, email:any, address:any, role:any) {
    this.new_obj = {id: id, b: username, c: password, d: email, e: address, f: role};
    this.wish_array.push(this.new_obj);
    localStorage.setItem("wish", JSON.stringify(this.wish_array));
  }
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
    this.payLoadUser = {'id': this.id, 'username': this.username, 'password': this.password, 'email': this.email, 'address': this.address, 'role': this.selectedRole};
    this.createuserService.createUser(this.payLoadUser).subscribe(data=>console.log(data));
    console.log("User updated");
  }
  removeUser(id:number) 
  {
    this.createuserService.deleteUser(id).subscribe(data=>console.log(data));
    window.location.reload();
   alert("User deleted");
  }
  searchUser () 
  {
    this.searchBool = true;
    this.createuserService.searchUser(this.searchText).subscribe(data=>{console.log(data); this.searchArray = data; });
    console.log("User found");
  }
  loadUsers()
  {
    this.createuserService.getUsers().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.user = data;
          this.temp_array = data;
          this.counts = Array(data.length).fill(0);
          this.disabled_cart = Array(data.length).fill(true);
          this.disabled_wish = Array(data.length).fill(true); // Get the length of the data array
          console.log("Users loaded", this.user);
        }
      },
    })
  }
  
  filterBy(category:string) {
    this.cat_array = this.temp_array.filter(item => item.category === category);
    this.filter_boolean = true;
  }

  onRoleChange(event: any): void {
    this.selectedRole = event.value;
    console.log('Selected Role:', this.selectedRole);
  }

}

