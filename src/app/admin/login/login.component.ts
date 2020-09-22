import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  UserName: string = "";
  Password: string = "";
  message: string = "";
  constructor(
    private ser: AccountService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    let token = this.ser.getToken();
    if (token && token !== "" && token !== undefined && token !== null) {
      alert("Cần đăng xuất để truy cập trang này!")
    }
  }
  LogOn() {
    var result: any;
    this.ser.login(this.UserName, this.Password)
      .subscribe(
        (res) => {
          result = res;
        }, (err) => {
          this.message = err.error.message;
          this.ser.ThongTinSauDangNhap.emit("");
        }, () => {
          this.message = 'Đăng nhập thành công';
          this.ser.saveToken(result.object.accessToken);
          this.ser.saveTokenData("InforUser",result.object.firstName + " " + result.object.lastName);
          this.ser.ThongTinSauDangNhap.emit(result.object.firstName + " " + result.object.lastName);
          this.router.navigateByUrl('/admin/post');
        }
      );
  }
  
}
