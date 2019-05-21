import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.css']
})
export class LoginMainComponent implements OnInit {

  constructor(private AuthServiceService:AuthServiceService, private Router:Router) { }

  ngOnInit() {
  }

  body = {    
      "mobileno":"",
      "password":""    
  }

  signIn(){
    this.AuthServiceService.login(this.body).subscribe((v)=>{
      localStorage.setItem('token', v.result.token);
			this.Router.navigate(['/dashboard']);      
    })
  }
}
