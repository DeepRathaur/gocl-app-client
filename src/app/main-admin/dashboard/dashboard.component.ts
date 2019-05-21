import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  menuClickBtn = new EventEmitter();
  menuClick(v){
    this.menuClickBtn.emit(v);
  }
}
