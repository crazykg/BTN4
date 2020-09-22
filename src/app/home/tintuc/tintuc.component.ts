import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/services/api';
import { Config } from '../../config';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss']
})
export class TintucComponent implements OnInit {

  constructor(
    private api:API
  ) { }

  ngOnInit(): void {
    this.getItemList()
  }

  private config = Config;

  //Tham số để đọc phân trang
  currentPageNumber = 1;//trang đang xem hiện tại. Mặc định vào sẽ là từ trang 1
  itemList =[] //ds sẽ hiển thị
  totalPageNumber = 0 //Tổng số trang có thể được phân trang = this.total / this.pageSize, mặc định pageSize =5

  getItemList() {
    let result: any;
    this.api.get("/api/Covid/list?PageNumber=" + this.currentPageNumber + "&PageSize=" + this.config.pageSize + "&Keyword=").subscribe((res) => {
      result = res;
    }, err => {
      console.log(err);
    }, () => {
      this.itemList = result.object.items
      let total = result.object.total;
      this.totalPageNumber = +Math.round(total / this.config.pageSize).toFixed(0);// hàm toFixed return string, thêm dấu + ở trước để convert thành số
      if (total / this.config.pageSize > this.totalPageNumber) this.totalPageNumber++
    });
  }
 backPage(){
   if(this.currentPageNumber >1) this.currentPageNumber --
   this.getItemList()
 }
 nextPage(){
  if(this.currentPageNumber < this.totalPageNumber) this.currentPageNumber ++
  this.getItemList()
 }
}
