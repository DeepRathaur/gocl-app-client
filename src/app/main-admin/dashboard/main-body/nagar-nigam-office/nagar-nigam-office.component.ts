import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';

@Component({
  selector: 'app-nagar-nigam-office',
  templateUrl: './nagar-nigam-office.component.html',
  styleUrls: ['./nagar-nigam-office.component.css']
})
export class NagarNigamOfficeComponent implements OnInit {

  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    this.getnagarnigamoffices();
    this.getnagarnigams();
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
  editNagarNigamOffice(v) {
    this.editObjId = v;
    this.editFlg = true;
    this.nagarnigamoffices.map((item) => {
      if (item.id == v) {
        this.editObj.name = item.name;
      }
    })
  }

    //delete board 
  trash(v) {
    this.CommonService.deleteRequest('nagarnigamoffices', v).subscribe(v => {
      this.getnagarnigamoffices();
    })
  }


  // add item  
  addNagarNigamOffice = {name:'',locality_id:'' ,nagar_nigam_id:'',mobileno:'',password:'',address:'' }     

  add(){
    if(this.addNagarNigamOffice.name == '' || this.addNagarNigamOffice.locality_id == '' || this.addNagarNigamOffice.nagar_nigam_id == '' || this.addNagarNigamOffice.mobileno=='' || this.addNagarNigamOffice.password=='' || this.addNagarNigamOffice.address==''){
            this.CommonService.msgFun('All fields are require', true, 'warning')      
            return false;      
      } 
      this.CommonService.postRequest('nagarnigamoffices', this.addNagarNigamOffice).subscribe(      
        v => {              
          if(v.status){
            this.getnagarnigamoffices();
            this.CommonService.msgFun(v.result.message, true, 'success')
            this.addNagarNigamOffice = {name:'',locality_id:'' ,nagar_nigam_id:'',mobileno:'',password:'',address:'' }            
          } else{          
            this.CommonService.msgFun(v.result.error, true, 'error');                      
          } 
        },       
        err =>{
          this.CommonService.msgFun(err.error.result.error, true, 'error');                      
        } 
      )    
    }

    updateNagarNigamOffice() {
    this.CommonService.putRequest('nagarnigamoffices', this.editObjId, this.editObj).subscribe(
    res =>{
      if(res.status){
        this.editFlg = false;
        this.CommonService.msgFun(res.result.message, true, 'success')
        this.getnagarnigamoffices();
      }else{          
        this.CommonService.msgFun(res.result.error, true, 'error');                      
      }
    },
    err =>{
      this.CommonService.msgFun(err.error.result.error, true, 'error');        
    } 
    )}

    canceladdNagarNigamOffice() {
    this.editFlg = false;
  }

}
