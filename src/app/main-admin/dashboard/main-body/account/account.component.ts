import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/main-admin/services/common.service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private CommonService:CommonService) { }

  ngOnInit() {
    this.getaccount();
    this.getcustomeraccountdetails();
  }

  account = [];
  getaccount() {
    this.CommonService.getRequestWithToken('customeraccount').subscribe((v) => {
      if (v.status) {
        this.account = v.result.customeraccountdetail;
        console.log(this.account);
      }
    })
  }

  data  = [];
  getcustomeraccountdetails() {
    this.CommonService.getRequestWithToken('reports').subscribe((v) => {
      if (v.status) {
        this.data = v.result.customeraccountdetails;
      }
    })
  }
  download() {
    console.log('sdfsdf');

// var data = [
//   {
//     name: 'Test 1',
//     age: 13,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
//   {
//     name: 'Test 2',
//     age: 11,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
//   {
//     name: 'Test 4',
//     age: 10,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
// ];

console.log(this.data);

  const options = { 
    fieldSeparator: ',',
    filename:'reportcustomer',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Customer Account Details',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

const csvExporter = new ExportToCsv(options);

csvExporter.generateCsv(this.data);

//console.log(csvExporter);

  }

}
