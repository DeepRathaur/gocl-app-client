import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/main-admin/services/common.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private router:Router,private CommonService:CommonService ) { }

  ngOnInit() {
  }
  logout(){
    this.router.navigate(['']);
localStorage.removeItem('token');
  }
}
