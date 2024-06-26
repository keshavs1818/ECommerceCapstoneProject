import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
 
  
  constructor(private homeService:HomeService , private http:HttpClient){}
  ngOnInit(): void {
    this.loadProducts();
  }
  disabled_cart: any;
  disabled_wish: any;
  sum: number;
  new_obj:object;
  cart_array: any[] = []
  wish_array: any[] = []
  temp_array: any;
  cat_set: any;
  searchBool: boolean;
  searchText: any;
  searchArray: any[];
  data = "productdetails";
  user: any[]; 
  cat_array: any;
  filter_boolean: boolean;
  counts: number[] = [];
  asc_desc:any;
  message:any;
  column_to_sort:any;
  count:number=0;
  stockId:number;
  saleId:number;

  maphash = {
    id: "id",
    name: "name",
    price: "price",
    category: "category",
    stockId: "stockId",
    saleId:"saleId"
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
  updateAdd(id:number, name:string, price:any, category:any, count:any, stockId:number, saleId:number) {
  
    this.new_obj = {a: id, b: name, c: price, d: category, e: count,f:stockId,g:saleId};
    this.cart_array.push(this.new_obj);
    localStorage.setItem("cart", JSON.stringify(this.cart_array));
    console.log(this.cart_array);
  }
  updateWish(id:number, name:string, price:any, category:any) {
    this.new_obj = {id: id, name: name, price: price, category: category};
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
  add(category:any) {
    this.cat_set.add(category);
  }
  searchProducts () 
  {
    this.searchBool = true;
    this.homeService.searchProducts(this.searchText).subscribe(data=>{console.log(data); if(Array.isArray(data)) {this.searchArray = data}});
    console.log("User found");
  }
  loadProducts()
  {
    this.homeService.getProducts().subscribe({
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
 reset(){
  this.searchBool=!this.searchBool
 }
}
