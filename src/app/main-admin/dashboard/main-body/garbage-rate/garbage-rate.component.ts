import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-garbage-rate',
  templateUrl: './garbage-rate.component.html',
  styleUrls: ['./garbage-rate.component.css']
})
export class GarbageRateComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getgarbagerates();
    this.getstates();
  }
  searchFild = '';
  hometypes  = [];
  getstates() {
    this.CommonService.getRequest('hometypes').subscribe((v) => {
      if (v.status) {
        this.hometypes = v.result.hometypes;
      }
    })
  }

  garbagerates  = [];
  getgarbagerates() {
    this.CommonService.getRequest('garbagerate').subscribe((v) => {
      if (v.status) {
        this.garbagerates = v.result.garbagerates;
      }
    })
  }

    // start edit garbagerates
  editObj = { amount: '' }
  editObjId = 0;
  editFlg = false;
  editgarbagerates(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.garbagerates.map((item) => {
      if (item.id == v) {
        this.editObj.amount = item.amount;
      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('garbagerate', v).subscribe(v => {
      this.getgarbagerates();
    })
  }


  // add item  
  addGarbageRate = { amount: '',home_type_id:'' }

  add(){
    if(this.addGarbageRate.amount == '' || this.addGarbageRate.home_type_id == ''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('garbagerate', this.addGarbageRate).subscribe(      
        v => {              
          if(v.status){
            this.getgarbagerates();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addGarbageRate = {amount: '',home_type_id:''}            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

    updateGarbageRate() {
    this.CommonService.putRequest('garbagerate', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getgarbagerates();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

    cancelGarbageRate() {
    this.editFlg = false;
  }
  // end edit States
  searchCity = '';
  searchCitybyStatename(v) {
    
    this.CommonService.getRequest('garbagerates/' + v).subscribe((v) => {
      if (v.status) {
        this.garbagerates = v.result.garbagerates;
      } else {
        this.CommonService.msgFun(v.result.error, true, 'error');
      }
    });
  }
}
