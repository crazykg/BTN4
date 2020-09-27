import { Component, OnInit } from '@angular/core';  
import { ContactUs } from '../../models/contactUs'; 

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.scss']
})
export class MyteamComponent implements OnInit { 
  ContactUs:ContactUs = new ContactUs(); 
  constructor(  
  ) { }

  ngOnInit(): void {
  }
   
  sendContact() { 
    let new_contact = {
      name: this.ContactUs.name, 
      email: this.ContactUs.email, 
      title: this.ContactUs.title,
      content: this.ContactUs.content
    }; 
    localStorage.ContactUs = '{name:' +  this.ContactUs.name + ', email:' + this.ContactUs.email 
    + ', title:' + this.ContactUs.title + ',content:' + this.ContactUs.content + '}'; 
    alert('Gửi thông tin thành công');
  }
}
