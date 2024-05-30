import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private http:HttpClient ){}
  storedCart:any;
  sum = 0;
  ngOnInit(): void {
    this.storedCart = JSON.parse(localStorage.getItem("cart"));
  }
  updateSum(number:number) {
    this.sum += number;
  }

  resetSum() {
    this.sum = 0;
  }

  removeUser(cart_obj:object, value:number) 
  {
    const index = this.storedCart.indexOf(cart_obj);
    if (index > -1) {
      this.storedCart.splice(index, 1);
    }
    this.sum -= value;
    localStorage.setItem("cart", JSON.stringify(this.storedCart));
  }
}

