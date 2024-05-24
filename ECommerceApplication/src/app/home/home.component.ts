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
  // Product Details Category
  id:any;
  name:any;
  price:any;
  category:any;

  // 
  user:any;
  new_category:string;
  data = "productdetails";
  payLoadUser:any;
  cat_array = [];
  new_array = [];
  fileName="";
  new_obj:object;
  filter_boolean:boolean;
  temp_array = [...this.cat_array];
  new_count = 0;
  count = 0;

  counts: number[] = [];
  saveUser () 
  {
    this.payLoadUser = {'id': this.id, 'name': this.name, 'price': this.price, 'category': this.category}
    this.homeService.createUser(this.payLoadUser).subscribe(data=>console.log(data));
    console.log("User updated");
  }
  removeUser () 
  {
    this.homeService.deleteUser(this.id).subscribe(data=>console.log(data));
    console.log("User deleted");
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
    /*data=>{this.user=data;
    this.counts = Array(data.length).fill(0); 
    console.log("Users loaded")});*/
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
    console.log("FILTER: " + this.temp_array);
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

