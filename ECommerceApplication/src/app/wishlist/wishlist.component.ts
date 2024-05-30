import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  constructor( private http:HttpClient ){}
  storedWish:any;
  ngOnInit(): void {
    this.storedWish = JSON.parse(localStorage.getItem("wish"));
  }
  removeUser(wishlist_obj:object) {
    const index = this.storedWish.indexOf(wishlist_obj);
    if (index > -1) {
      this.storedWish.splice(index, 1);
    }
    localStorage.setItem("wish", JSON.stringify(this.storedWish));
  }
}
