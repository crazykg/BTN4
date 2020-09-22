import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  ThongTinDangNhap = ""
  constructor(
    private ser: AccountService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.ser.ThongTinSauDangNhap.subscribe(data => this.ThongTinDangNhap = data);
    var token = this.ser.getToken();
      if (token && token !== "" && token !== undefined && token !== null) {
        this.ThongTinDangNhap = this.ser.getTokenByName("InforUser");
        this.router.navigate(['admin/post']);
      } else {        
        this.router.navigate(['admin/login']);
      }
  }
  LogOut() {
    this.ser.removeToken("token");
    this.ser.removeToken("InforUser");
    this.router.navigateByUrl("/admin")
  }
}
