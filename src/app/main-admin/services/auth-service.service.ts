import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';


@Injectable()
export class AuthServiceService {

  constructor(private http: HttpClient, private CommonService: CommonService) { }

  login(user) {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<any>(this.CommonService.ip+'/users/login', user, { headers: header })
  }
}