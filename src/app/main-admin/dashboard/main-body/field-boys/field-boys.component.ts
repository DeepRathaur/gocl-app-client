import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-field-boys',
  templateUrl: './field-boys.component.html',
  styleUrls: ['./field-boys.component.css']
})
export class FieldBoysComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getFieldBoys();
    this.getlocality();
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
  fieldboys = [];
  getFieldBoys() {
    this.CommonService.getRequestWithToken('fieldboys').subscribe((v) => {
      if (v.status) {
        this.fieldboys = v.result.fieldboys;
      }
    })
  }
  addObj= { 
    name:'',
    mobileno:'',
    password:'',
    address:'',
    locality_id:''
  }

  editObj = {   name:'',
  mobileno:'',
  password:'',
  address:'',
  locality_id:'' }
  editObjId = 0;
  editFlg = false;
  edit(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.fieldboys.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
        this.editObj.mobileno = item.mobileno;
        this.editObj.address = item.address;

      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('fieldboys', v).subscribe(v => {
      this.getFieldBoys();
    })
  }  

 
  add() {
    if(this.addObj.name == '' || this.addObj.mobileno== '' || this.addObj.password== '' ||this.addObj.address== '' ||this.addObj.locality_id == ''  ) {
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('fieldboys', this.addObj).subscribe(      
        v => {              
          if(v.status){
            this.getFieldBoys();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addObj = {name:'',
            mobileno:'',
            password:'',
            address:'',
            locality_id:''}            
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
    this.CommonService.putRequest('fieldboys', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getFieldBoys();
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
