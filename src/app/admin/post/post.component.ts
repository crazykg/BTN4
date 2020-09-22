import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { API } from 'src/app/services/api';
import { PostModel, PostEntity } from '../../models/PostModel';
import { Config } from '../../config';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private config = Config;
  //#region Search input params
  pageIndex = 1
  pageSize = this.config.pageSize
  keyWord = ""
  //#endregion Search input params 

  pageNumber = 1
  arrPageList = []

  //#region Output
  itemList = [];
  itemListCopyToSave = [];
  total: number = 0
  //#region Output

  //obj:object = {}  //test thử dùng object thay vì model
  //obj = new Object()
  @ViewChild('closeBtn') closeBtn: ElementRef;
  model: PostModel = new PostModel()
  listSelected: string = ""
  disabled = true
  constructor(
    private api: API
  ) { }

  ngOnInit(): void {
    this.getItemList();
  }

  //#region CRUD

  isdisabled(): boolean {
    if (document.getElementById("tblContent") == null) return true
    let allInputById = document.getElementById("tblContent").querySelectorAll("input")
    for (let i = 0; i < allInputById.length; i++) {
      if (allInputById[i].checked) {
        this.disabled =  false
        return false
      }
    }
    this.disabled =  true
    return true
  }

  //lấy danh sách dữ liệu
  getItemList() {
    let result: any;
    this.api.get("/api/Covid/list?PageNumber=" + this.pageIndex + "&PageSize=" + this.pageSize + "&Keyword=" + this.keyWord + "").subscribe((res) => {
      result = res;
    }, err => {
      console.log(err);
    }, () => {
      this.itemList = this.itemListCopyToSave = result.object.items;
      this.total = result.object.total;
      this.pageNumber = +Math.round(this.total / this.pageSize).toFixed(0);
      if (this.total / this.pageSize > this.pageNumber) this.pageNumber++
      this.arrPageList = Array(this.pageNumber).fill(this.pageNumber).map((x, i) => i + 1);
      //console.log((this.total / this.pageSize))
    });
  }

  //xóa 1 dòng dữ liệu
  remove(id: number) {
    if (window.confirm('Bạn thực sự muốn xóa')) {
      this.api.delete('/api/Covid/delete/' + id).subscribe((res) => {
      }, err => {
        console.log(err);
        alert('Xóa không thành công');

      }, () => {

        alert('Xóa thành công');
        this.getItemList();

      });
    }
    else {
      alert('Hành động bị hủy bởi người dùng');
    }
  }

  //Xóa thông tin trên modal khi bấm thêm mới
  refreshModal() {
    this.model.id = 0
    this.model.content = this.model.title = ""
  }

  //act lấy dữ liệu Edit infor
  getItem(id: number) {
    let result: any;
    this.api.get('/api/Covid/get-by-id/' + id).subscribe((res) => {
      result = res;
    }, err => {
      alert('Không tồn tại danh mục này');
    }, () => {
      this.model.id = result.object.id;
      this.model.title = result.object.title;
      this.model.content = result.object.content;
    });
  }


  addOrEdit() {
    if (this.model.formGroup.valid) {
      var obj = new PostEntity();
      let kqFromApi: any;
      var data = (this.model);
      Object.keys(obj).map(function (key, index) {
        obj[key] = data[key];
      });
      if (this.model.id == 0) {
        this.api.post("/api/Covid/add", obj).subscribe((res) => {
        }, err => {
          alert('Thêm mới không thành công. Vui lòng thử lại');
        }, () => {
          alert('Thêm mới thành công');
          this.closeBtn.nativeElement.click();
          this.getItemList();
        });
      }
      else {
        this.api.put("/api/Covid/edit", obj).subscribe((res) => {
          kqFromApi = res;
        }, err => {
          alert('Cập nhật không thành công ' + err.message);
          console.log(err)
        }, () => {
          if (kqFromApi.state = "true") {
            alert(kqFromApi.message);
          }
          else {
            alert(kqFromApi.message + ":" + kqFromApi.object.data);
          }
          this.closeBtn.nativeElement.click();
          this.getItemList();
        });
      }
    }
  }
  //#endregion CRUD
  deleteByListChecked() {
    if (window.confirm('Bạn thực sự muốn xóa')) {
      let errStr = ""
      let allInputById = document.getElementById("tblContent").querySelectorAll("input")
      for (let i = 0; i < allInputById.length; i++) {
        if (allInputById[i].checked) {
          this.api.delete('/api/Covid/delete/' + allInputById[i].value).subscribe((res) => {
          }, err => {
            errStr += err.message;
          }, () => { });
        }
      }
      if (errStr != "") {
        alert('Có lỗi trong quá trình xóa!');
      }
      else {
        alert('Xóa thành công');
      }
      this.getItemList()
    }
    else {
      alert('Hành động bị hủy bởi người dùng');
    }
  }

  //nut select all
  selectAll(evt: any) {
    let allInputById = document.getElementById("tblContent").querySelectorAll("input")
    for (let i = 0; i < allInputById.length; i++) {
      allInputById[i].checked = evt.checked;
    }
    this.isdisabled();
  }
  select() {
    this.isdisabled();
  }
  //auto fillter theo trạng thái => không dùng dó api ko cấp
  filterByTrangThai(idTrangThai: any) {

    // if (idCategory == "0")
    //   this.PostLst = this.PostLstCopyToSave;
    // else
    //   this.PostLst = this.PostLstCopyToSave.filter((item) => item.CategoryId == idCategory);
  }

  //act auto tìm kiếm khi gõ từ khóa trên form tìm kiếm
  filterByTuKhoa(tuKhoaTxt: string) {
    this.keyWord = tuKhoaTxt
    this.getItemList();
  }

  //act chọn trang khác trong quá trình phân trang
  changePageNumber(index: number, btnActive: any) {
    let lstBtnPazing = document.getElementsByClassName("btnPazing");
    for (var i = 0; i < lstBtnPazing.length; i++) {
      lstBtnPazing[i].classList.remove("active");
    }
    btnActive.className += " active"
    //btnActive.addClass();
    this.pageIndex = index;
    this.getItemList()
  }

  //act Thay đổi page size
  changePageSize(size: number) {
    this.pageIndex = 1;
    this.pageSize = size;
    this.getItemList()
  }
}
