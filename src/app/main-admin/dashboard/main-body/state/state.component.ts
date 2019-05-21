import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getstates();
  }
  
  states = [];
  getstates() {
    this.CommonService.getRequest('states').subscribe((v) => {
      if (v.status) {
        this.states = v.result.states;
      }
    })
  }
  // start edit States
  editObj = { name: '' }
  editObjId = 0;
  editFlg = false;
  editStates(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.states.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }
  updateStates() {
    this.CommonService.putRequest('states', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getstates();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

  cancelStates() {
    this.editFlg = false;
  }
  // end edit States


  //delete board 
  trash(v) {
    this.CommonService.deleteRequest('states', v).subscribe(v => {
      this.getstates();
    })
  }


  // add item  
  addState = { name: '' }

  add(){
    if(this.addState.name == ''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('states', this.addState).subscribe(      
        v => {              
          if(v.status){
            this.getstates();
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
