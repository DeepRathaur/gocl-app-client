import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.css']
})
export class LocalityComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getlocalities();
    this.getstates();
  }
  searchFild = '';
  states  = [];
  getstates() {
    this.CommonService.getRequest('states').subscribe((v) => {
      if (v.status) {
        this.states = v.result.states;
      }
    })
  }

  
  cities  = [];
  getcities(event) {
    let id  = event.target.value;
    this.CommonService.getRequest('cities/'+ id).subscribe((v) => {
      if (v.status) {
        this.cities = v.result.cities;
      }
    })
  }


  localities  = [];
  getlocalities() {
    this.CommonService.getRequest('localities').subscribe((v) => {
      if (v.status) {
        this.localities = v.result.localties;
      }
    })
  }

    // start edit localities
  editObj = { name: '' }
  editObjId = 0;
  editFlg = false;
  editLocality(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.localities.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('localities', v).subscribe(v => {
      this.getlocalities();
    })
  }


  // add item  
  addLocality = { name: '',state_id:'',city_id:'' }

  add(){
    if(this.addLocality.name == '' || this.addLocality.state_id == '' || this.addLocality.city_id == ''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('localities', this.addLocality).subscribe(      
        v => {              
          if(v.status){
            this.getlocalities();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addLocality = {name:'',state_id:'' ,city_id:'' }            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

    updateLocality() {
    this.CommonService.putRequest('localities', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getlocalities();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

  cancelLocality() {
    this.editFlg = false;
  }
  // end edit States
  // searchLocality = '';
  // searchLocalitybyCityename(v) {
  //   this.CommonService.getRequest('localities/' + v).subscribe((v) => {
  //     if (v.status) {
  //       this.localities = v.result.localities;
  //     } else {
  //       this.CommonService.msgFun(v.result.error, true, 'error');
  //     }
  //   });
  // }
}
