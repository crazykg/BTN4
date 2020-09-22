import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private ser: AccountService,
    private r: Router
  ) { }

  ngOnInit(): void {
    
  }

}
