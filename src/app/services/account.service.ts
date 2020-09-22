import { Injectable, Output, EventEmitter } from '@angular/core';
import { API } from './api';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() ThongTinSauDangNhap: EventEmitter<any> = new EventEmitter();
  constructor(
    private api: API //inject API class
  ) {}

  login(username:string, password:string) {
    const body = {
      "username": username,
      "password": password
    }
    this.ThongTinSauDangNhap.emit("");
    return this.api.post('/api/Account/login', body);
  }

  saveToken(token:string) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
  }
  
  saveTokenData(tokenName:string, value:string) {
    return localStorage.setItem(tokenName, value);
  }

  getTokenByName(tokenName:string) {
    return localStorage.getItem(tokenName) ? localStorage.getItem(tokenName) : sessionStorage.getItem(tokenName);
  }

  removeToken(tokenName:string){
    localStorage.removeItem(tokenName)
  }
}
