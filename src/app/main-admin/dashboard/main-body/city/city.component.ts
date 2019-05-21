import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getcities();
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
  getcities() {
    this.CommonService.getRequest('cities').subscribe((v) => {
      if (v.status) {
        this.cities = v.result.cities;
      }
    })
  }

    // start edit cities
  editObj = { name: '' }
  editObjId = 0;
  editFlg = false;
  editCities(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.cities.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('cities', v).subscribe(v => {
      this.getcities();
    })
  }


  // add item  
  addCity = { name: '',state_id:'' }

  add(){
    if(this.addCity.name == '' || this.addCity.state_id == ''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('cities', this.addCity).subscribe(      
        v => {              
          if(v.status){
            this.getcities();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addCity = {name:'',state_id:''}            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

   updateCity() {
    this.CommonService.putRequest('cities', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getcities();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

  cancelCity() {
    this.editFlg = false;
  }
  // end edit States
  searchCity = '';
  searchCitybyStatename(v) {
    
    this.CommonService.getRequest('cities/' + v).subscribe((v) => {
      if (v.status) {
        this.cities = v.result.cities;
      } else {
        this.CommonService.msgFun(v.result.error, true, 'error');
      }
    });
  }
}
