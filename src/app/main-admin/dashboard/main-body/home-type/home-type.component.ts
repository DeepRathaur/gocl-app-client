import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-home-type',
  templateUrl: './home-type.component.html',
  styleUrls: ['./home-type.component.css']
})
export class HomeTypeComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.gethometypes();
  }
  hometypes = [];
  gethometypes() {
    this.CommonService.getRequest('hometypes').subscribe((v) => {
      if (v.status) {
        this.hometypes = v.result.hometypes;
      }
    })
  }
  // start edit States
  editObj = { name: '' }
  editObjId = 0;
  editFlg = false;
  editHometypes(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.hometypes.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }
  updateHometypes() {
    this.CommonService.putRequest('hometypes', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.gethometypes();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

    cancelHometypes() {
    this.editFlg = false;
  }
  // end edit States


  //delete board 
  trash(v) {
    this.CommonService.deleteRequest('hometypes', v).subscribe(v => {
      this.gethometypes();
    })
  }


  // add item  
  addState = { name: '' }

  add(){
    if(this.addState.name == ''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('hometypes', this.addState).subscribe(      
        v => {              
          if(v.status){
            this.gethometypes();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addState = {name:''}            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

}
