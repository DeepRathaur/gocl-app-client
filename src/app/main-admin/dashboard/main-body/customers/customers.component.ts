import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private CommonService:CommonService) { }

  ngOnInit() {
    this.getlocality();
    this.gethometype();
    this.getFieldBoys();
    this.getcustomers();
  }

  locality = [];
  getlocality(){
    this.CommonService.getRequest('localities').subscribe((v) => {
      if (v.status) {
        this.locality = v.result.localties;
        console.log(this.locality);
      }
    })
  }
  fieldboy = [];
  getFieldBoys() {
    this.CommonService.getRequestWithToken('fieldboys').subscribe((v) => {
      if (v.status) {
        this.fieldboy = v.result.fieldboys;
      }
    })
  }

  hometype = [];
  gethometype() {
    this.CommonService.getRequestWithToken('hometypes').subscribe((v) => {
      if (v.status) {
        this.hometype = v.result.hometypes;
      }
    })
  }
  customers = [];
  getcustomers() {
    this.CommonService.getRequestWithToken('customers').subscribe((v) => {
      if (v.status) {
        this.customers = v.result.customers;
      }
    })
  }
  addObj= { 
    name:'',
    mobileno:'',
    password:'',
    address:'',
    locality_id:'',
    home_type_id:'',
    field_boy_id:''
  }

  editObj = {   name:'',
  mobileno:'',
  address:''
   }
  editObjId = 0;
  editFlg = false;
  edit(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.customers.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
        this.editObj.mobileno = item.mobileno;
        this.editObj.address = item.address;

      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('customers', v).subscribe(v => {
      this.getFieldBoys();
    })
  }  

 
  add() {
    if(this.addObj.name == '' || this.addObj.mobileno== '' || this.addObj.home_type_id== '' ||this.addObj.address== '' ||this.addObj.locality_id == '' ||this.addObj.field_boy_id == '' ) {
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('customers', this.addObj).subscribe(      
        v => {              
          if(v.status){
            this.getFieldBoys();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addObj = {name:'',
            mobileno:'',
            password:'',
            address:'',
            locality_id:'',
            home_type_id:'',
            field_boy_id:''}            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

    update() {
    this.CommonService.putRequest('customers', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getcustomers();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

    cancel() {
    this.editFlg = false;
  }
}


