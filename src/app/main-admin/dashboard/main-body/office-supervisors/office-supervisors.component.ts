import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-office-supervisors',
  templateUrl: './office-supervisors.component.html',
  styleUrls: ['./office-supervisors.component.css']
})
export class OfficeSupervisorsComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getnagarnigamoffices();
    this.getsupervisors();
    this.getlocalities();
  }
      
  searchFild = '';
  localities  = [];
  getlocalities() {
    this.CommonService.getRequest('localities').subscribe((v) => {
      if (v.status) {
        this.localities = v.result.localties;
      }
    })
  }

  nagarnigamoffices  = [];
  getnagarnigamoffices() {
    this.CommonService.getRequestWithToken('nagarnigamoffices').subscribe((v) => {
      if (v.status) {
        this.nagarnigamoffices = v.result.nagarnigamoffices;
      }
    })
  }

  supervisors  = [];
  getsupervisors() {
    this.CommonService.getRequestWithToken('supervisors').subscribe((v) => {
      if (v.status) {
        this.supervisors = v.result.supervisors;
      }
    })
  }



    // start edit localities
  editObj = { name: '' }
  editObjId = 0;
  editFlg = false;
  editOfficeSupervisor(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.supervisors.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('supervisors', v).subscribe(v => {
      this.getsupervisors();
    })
  }


  // add item  
  AddOfficeSupervisor = {name:'',locality_id:'' ,nagar_nigam_office_id:'',mobileno:'',password:'',address:'' }     

  add(){
    if(this.AddOfficeSupervisor.name == '' || this.AddOfficeSupervisor.locality_id == '' || this.AddOfficeSupervisor.nagar_nigam_office_id == '' || this.AddOfficeSupervisor.mobileno=='' || this.AddOfficeSupervisor.password=='' || this.AddOfficeSupervisor.address==''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('supervisors', this.AddOfficeSupervisor).subscribe(      
        v => {              
          if(v.status){
            this.getsupervisors();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.AddOfficeSupervisor = {name:'',locality_id:'' ,nagar_nigam_office_id:'',mobileno:'',password:'',address:'' }            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

    updateOfficeSupervisor() {
    this.CommonService.putRequest('supervisors', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getsupervisors();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

    cancelOfficeSupervisor() {
    this.editFlg = false;
  }




}
