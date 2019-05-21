import { Component, OnInit, Input } from '@angular/core';
import {  CommonService } from '../../common.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor( private CommonService:CommonService) {
    this.msgObj = this.CommonService.msgObj; 
    this.CommonService.detectMsg.subscribe((item)=>{
      this.msgObj = item;
    })
  }
  msgObj =  {flag:<any>'', type:<any>''};
  flg = false;
  ngOnInit() {
   
  }
}