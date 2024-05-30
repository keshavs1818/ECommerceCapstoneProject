import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor( private http:HttpClient ){}
  storedCart:any;
  ngOnInit(): void {
    this.storedCart = JSON.parse(localStorage.getItem("cart"));
  }
}
