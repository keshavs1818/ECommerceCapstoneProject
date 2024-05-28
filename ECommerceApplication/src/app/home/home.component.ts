import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[HomeService, HttpClient]
})
export class HomeComponent {
  constructor(private homeService:HomeService ,private http:HttpClient){}
  // Columns For Product Details
  id:any;
  name:any;
  price:any;
  category:any;

  // Name to Search From
  searchText:any;

  // Column To Sort
  column_to_sort:any;

  
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
  showCartBool:boolean;
  showWishBool:boolean;
  sum:number;
  
  counts: number[] = [];

  maphash = {
    id: "id",
    name: "name",
    price: "price",
    category: "category"
  };
  updateSum(num:number) {
    this.sum += num;
  }
  updateAdd(id:number, name:string, price:any, category:any, count:any) {
    this.new_obj = {a: id, b: name, c: price, d: category, e: count};
    this.cart_array.push(this.new_obj);
    console.log(this.cart_array);
  }
  updateWish(id:number, name:string, price:any, category:any) {
    this.new_obj = {id: id, name: name, price: price, category: category};
    this.wish_array.push(this.new_obj);
  }
  showCart() {
    this.showCartBool = true;
  }
  showWish() {
    this.showWishBool = true;
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
    this.payLoadUser = {'id': this.id, 'name': this.name, 'price': this.price, 'category': this.category};
    this.message = "The product " + this.name + " with id " + this.id + " has been added.";
    this.homeService.createUser(this.payLoadUser).subscribe(data=>console.log(data));
    console.log("User updated");
  }
  removeUser() 
  {
    this.homeService.deleteUser(this.id).subscribe(data=>console.log(data));
    console.log("User deleted");
  }
  searchUser () 
  {
    this.homeService.searchUser(this.searchText).subscribe(data=>console.log(data));
    console.log("User found");
  }
  loadUsers()
  {
    this.homeService.getUsers().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.user = data;
          this.temp_array = data;
          this.counts = Array(data.length).fill(0); // Get the length of the data array
          console.log("Users loaded", this.user);
        }
      },
    })
  }
  decCount(index:number)
  {
    if(this.counts[index]>0){
    this.counts[index]--;
    }
  }
  incCount(index:number)
  {
    this.counts[index]++;
  }
  filterBy(category:string) {
    this.cat_array = this.temp_array.filter(item => item.category === category);
    this.filter_boolean = true;
  }
  onFileSelected(event){
    const file:File= event.target.files[0];
    if(file){
      this.fileName=file.name;
      const formData= new FormData();
      formData.append("file",file);
      this.homeService.bulkUpload(formData).subscribe();
      console.log("users sent")
    }
  }
}

