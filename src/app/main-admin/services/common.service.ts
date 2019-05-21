import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable()
export class CommonService {
  constructor(private HttpClient: HttpClient) { }
  get ip() {
    return 'http://192.168.9.116:50005/v1'
    //  return 'http://gcol.ckmeout.com:50005/v1'
  }

  // call message
  detectMsg = new EventEmitter();
  msgObj = { message: '', flag: false, type: '' };
  msgFun(msg, bool, type) {
    this.msgObj = { message: msg, flag: bool, type: type };
    this.detectMsg.emit(this.msgObj);
    setTimeout(() => { this.msgObj.flag = false }, 4000)
  }
  // end call message

  // test  
  getToken() {
    let t = localStorage.getItem("token");
    let header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": t });
    return header;
  }


  //get 
  getHolder = new EventEmitter();
  get(v) {
    const m = v.toLowerCase();
    this.HttpClient.get<any>(this.ip + '/' + v, { headers: this.getToken() }).subscribe((v) => {
      this.getHolder.emit(v.result);
    })
  }


  //edit 
  editHolder = new EventEmitter();
  obj = new Object();
  makeObj(arr) {
    for (let v = 0; v < arr.length; v++) {
      this.obj[arr[v]] = '';
    }
    return this.obj;
  }
  edit(str, id, arr) {
    let obj = this.makeObj(arr);
    this.HttpClient.put<any>(this.ip + '/' + str + '/' + id, obj, { headers: this.getToken() }).subscribe(v => {
      this.editHolder.emit(v);
    });
  }
  // end test
  // getRequest
  getRequest(item) {
    return this.HttpClient.get<any>(this.ip + '/' + item)
  }

  // getRequest with token
  getRequestWithToken(item) {
    let t = localStorage.getItem("token");
    let header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": t });
    return this.HttpClient.get<any>(this.ip + '/' + item, { headers: header })
  }

  // getRequest with token and Id
  getRequestWithTokenAndId(item, id) {
    let t = localStorage.getItem("token");
    let header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": t });
    return this.HttpClient.get<any>(this.ip + '/' + item + '/' + id, { headers: header })
  }



  //put Request
  putRequest(str, id, obj) {
    let t = localStorage.getItem("token");
    let header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": t });
    return this.HttpClient.put<any>(this.ip + '/' + str + '/' + id, obj, { headers: header });
  }


  //delete Request
  deleteRequest(str, id) {
    let t = localStorage.getItem("token");
    let header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": t });
    return this.HttpClient.delete<any>(this.ip + '/' + str + '/' + id, { headers: header });
  }


  //delete Request
  postRequest(str, obj) {
    let t = localStorage.getItem("token");
    let header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": t });
    return this.HttpClient.post<any>(this.ip + '/' + str, obj, { headers: header });
  }
}