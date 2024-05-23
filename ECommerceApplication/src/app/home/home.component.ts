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
  id:any;
  name:any;
  price:any;
  count:number=0;
  user:any;
  data = "productdetails";
  payLoadUser:any;
  fileName="";
  saveUser () 
  {
    this.payLoadUser = {'id': this.id, 'name': this.name, 'price': this.price}
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
    this.homeService.getUsers().subscribe(data=>this.user=data);
    console.log("Users loaded");
  }
  decCount()
  {
    if(this.count>0){
    this.count -= 1;
    }
  }
  incCount()
  {
    this.count += 1;
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

