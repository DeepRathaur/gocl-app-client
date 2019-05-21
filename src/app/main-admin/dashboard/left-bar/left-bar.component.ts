import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  masterFlg = false;
  cmsFlg = false;
  reportFlg = false;
  coursesFlg = false;
  universityFlg = false;
  schoolFlg = false;
  sprFlg  = false;
  courese(){
    this.coursesFlg = !this.coursesFlg;
  }

  master(){
    this.masterFlg = !this.masterFlg
  }
  cms(){
    this.cmsFlg = !this.cmsFlg
  }
  university(){
    this.universityFlg = !this.universityFlg;
  }
  school(){
    this.schoolFlg = !this.schoolFlg;
  }

  report(){
    this.reportFlg = !this.reportFlg
  }
  supervisor() {
    this.sprFlg = !this.sprFlg
  }
}
