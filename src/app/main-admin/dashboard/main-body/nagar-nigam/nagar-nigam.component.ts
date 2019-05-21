import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-nagar-nigam',
  templateUrl: './nagar-nigam.component.html',
  styleUrls: ['./nagar-nigam.component.css']
})
export class NagarNigamComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getnagarnigams();
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


  nagarnigams  = [];
  getnagarnigams() {
    this.CommonService.getRequestWithToken('nagarnigam').subscribe((v) => {
      if (v.status) {
        this.nagarnigams = v.result.nagarnigams;
      }
    })
  }

    // start edit localities
  editObj = { name: '' }
  editObjId = 0;
  editFlg = false;
  editNagarNigam(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.nagarnigams.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('nagarnigam', v).subscribe(v => {
      this.getnagarnigams();
    })
  }


  // add item  
  addNagarNigam = { name: '',state_id:'',city_id:'',mobileno:'',password:'',address:'' }

  add(){
    if(this.addNagarNigam.name == '' || this.addNagarNigam.state_id == '' || this.addNagarNigam.city_id == '' || this.addNagarNigam.mobileno=='' || this.addNagarNigam.password=='' || this.addNagarNigam.address==''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('nagarnigam', this.addNagarNigam).subscribe(      
        v => {              
          if(v.status){
            this.getnagarnigams();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addNagarNigam = {name:'',state_id:'' ,city_id:'',mobileno:'',password:'',address:'' }            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

    updateNagarNigam() {
    this.CommonService.putRequest('nagarnigam', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getnagarnigams();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

  cancelNagarNigam() {
    this.editFlg = false;
  }

}
