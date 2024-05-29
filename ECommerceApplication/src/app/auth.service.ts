import { Injectable } from '@angular/core';
import {HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  private token = localStorage.getItem('token');
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({'Authorization': 'Bearer ' + this.token});
  }
}
