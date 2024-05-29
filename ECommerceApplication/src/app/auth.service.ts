import { Injectable } from '@angular/core';
import {HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer ${token}'});
  }
}
