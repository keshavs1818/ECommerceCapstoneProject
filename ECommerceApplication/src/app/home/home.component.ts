import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SalesService } from '../sales.service';
import { StocksService } from '../stocks.service';
// import * as Papa from 'papaparse';
import Papa from 'papaparse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[HomeService,SalesService,StocksService, HttpClient]
})
export class HomeComponent {
 
  
  constructor(private homeService:HomeService ,private saleService:SalesService,private stockService:StocksService, private http:HttpClient){}
  id:any;
  name:any;
  price:any;
  category:any;
  imageUrl:any;
  saleId:number;
  stockId:number;
  count:number=0;
  editName: String;
  editcategory: any;
  editImgUrl: any;
  // Name to Search From
  searchText:any;
  editPayloadProd:any;
  // Column To Sort
  column_to_sort:any;

  
  user:any;
  new_category:string;
  data = "productdetails";
  payLoadUser:any;
  payloadSales:any;
  payloadStocks:any;
  cat_array = [];
  new_array = [];
  fileName="";

  cat_set = new Set();
  new_obj:object;
  filter_boolean:boolean;
  sort_boolean:boolean;
  temp_array = [...this.cat_array];
  new_count = 0;
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
  editBool:boolean= false;
  editid:number;
  editStockId:number;
  editSaleId:number;
  editPrice: any;
  counts: number[] = [];

  maphash = {
    id: "id",
    name: "name",
    price: "price",
    category: "category"
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
  updateAdd(id:number, name:string, price:any, category:any, count:any) {
    this.new_obj = {a: id, b: name, c: price, d: category, e: count};
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
  add(category:string) {
    this.cat_set.add(category);
  }
  saveProduct () 
  {
    this.payLoadUser = {'id': this.id, 'name': this.name, 'price': this.price, 'category':this.category, 'imageUrl':this.imageUrl,"stockId":this.stockId,"saleId":this.saleId };
    this.payloadSales={"saleId":this.saleId, "quantities":[], "dates":[]};
    this.payloadStocks={"stockId":this.stockId,"stockAvailable":15};
    this.homeService.createProduct(this.payLoadUser).subscribe(data=>console.log(data));
    this.stockService.createStock(this.payloadStocks).subscribe();
    this.saleService.createSales(this.payloadSales).subscribe();
    alert("Product Created")
    console.log("User updated");
  }
  removeProduct(id:number) 
  {
    this.homeService.deleteProduct(id).subscribe(data=>console.log(data));
    console.log("User deleted");
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
      const reader = new FileReader();

      // Set up the callback for when the file is fully read
      reader.onload = (e) => {
        const csvData = reader.result as string;
        this.extractColumnData(csvData, 'saleId');
        this.extractColumnData(csvData,"stockId")// Change 'id' to the actual column name you want to extract
      };

      // Initiate the file reading process
      reader.readAsText(file);
      console.log("users sent")
    }
  }
  extractColumnData(csvData: string, columnName: string) {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        const data = result.data;
        const columnData = data.map(row => row[columnName]).filter(value => value !== undefined);
        const ids = columnData.map(id => parseInt(id, 10)); // Ensure the IDs are integers
        this.sendIdsToApi(ids,columnName);
        console.log(ids,columnName)
      }
    });
  }
  sendIdsToApi(ids: number[],columnName:String) {
    if(columnName==="saleId"){
    ids.forEach(id => {
      this.payloadSales={"saleId":id, "quantities":[], "dates":[]};
      this.saleService.createSales(this.payloadSales).subscribe(data=>console.log(data))
      console.log("ran sales");
    });}
    else{
      ids.forEach(id => {
        this.payloadStocks={"stockId":id, "stockAvailable":15};
        this.stockService.createStock(this.payloadStocks).subscribe()
        console.log("ran stocks")
      });}
    }
  onImgSelected(event){
    const file:File= event.target.files[0];
    if(file){
      this.fileName=file.name;
      const formData= new FormData();
      formData.append("file",file);
      this.homeService.imgUpload(formData).subscribe();
      console.log("Image sent " + this.fileName)
      
    }
  }

  edit(id:number,stockId:number,saleId:number,price:any,name:String,category:any,imageUrl:any){
      this.editBool=!this.editBool;
      this.editid=id;
      this.editStockId=stockId;
      this.editSaleId=saleId;
      this.editPrice=price;
      this.editName=name;
      this.editcategory=category;
      this.editImgUrl=imageUrl;
      }
  updateProd(){
    this.editPayloadProd = {'id': this.editid, 'name': this.editName, 'price': this.editPrice, 'category':this.editcategory, 'imageUrl':this.editImgUrl,"stockId":this.editStockId,"saleId":this.editSaleId };
    this.homeService.updateProduct(this.editPayloadProd,this.editid).subscribe(data=>console.log(data));
    console.log("product updated")
  }
}

