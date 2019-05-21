import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { CKEditorModule } from 'ng2-ckeditor';

import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './services/auth-service.service';
import { CommonService } from './services/common.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginMainComponent } from './login-main/login-main.component';
import { MessagesComponent } from './services/common-component/messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftBarComponent } from './dashboard/left-bar/left-bar.component';
import { TopBarComponent } from './dashboard/top-bar/top-bar.component';
import { StateComponent } from './dashboard/main-body/state/state.component';
import { CityComponent } from './dashboard/main-body/city/city.component';
import { LocalityComponent } from './dashboard/main-body/locality/locality.component';
import { HomeTypeComponent } from './dashboard/main-body/home-type/home-type.component';
import { FilterPipe } from './filter.pipe';
import { GarbageRateComponent } from './dashboard/main-body/garbage-rate/garbage-rate.component';
import { CustomersComponent } from './dashboard/main-body/customers/customers.component';
import { FieldBoysComponent } from './dashboard/main-body/field-boys/field-boys.component';
import { OfficeSupervisorsComponent } from './dashboard/main-body/office-supervisors/office-supervisors.component';
import { NagarNigamOfficeComponent } from './dashboard/main-body/nagar-nigam-office/nagar-nigam-office.component';
import { NagarNigamComponent } from './dashboard/main-body/nagar-nigam/nagar-nigam.component';
import { ReportsComponent } from './dashboard/main-body/reports/reports.component';
import { AccountComponent } from './dashboard/main-body/account/account.component';

const routes:Routes = [
    {path:'', component:LoginMainComponent},
    {path:'dashboard', component:DashboardComponent, children:[
      {path:'locality', component:LocalityComponent},
      {path:'home-type', component:HomeTypeComponent},
      {path:'state', component:StateComponent},
      {path:'city', component:CityComponent},
      {path:'garbage-rate', component:GarbageRateComponent},                                                              
      {path:'nagar-nigam', component:NagarNigamComponent},                                                              
      {path:'nagar-nigam-office', component:NagarNigamOfficeComponent},                                                              
      {path:'office-supervisors', component:OfficeSupervisorsComponent},                                                              
      {path:'field-boys', component:FieldBoysComponent},                                                              
      {path:'customers', component:CustomersComponent}, 
      {path:'reports', component:ReportsComponent},                                                                
      {path:'account', component:AccountComponent},                                                                
     ]},
]

@NgModule({
  imports: [
    CommonModule,FormsModule, HttpClientModule,//CKEditorModule,MyDatePickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginMainComponent, MessagesComponent, DashboardComponent, LeftBarComponent, TopBarComponent, StateComponent, CityComponent, LocalityComponent, HomeTypeComponent ,FilterPipe, GarbageRateComponent, CustomersComponent, FieldBoysComponent, OfficeSupervisorsComponent, NagarNigamOfficeComponent, NagarNigamComponent, ReportsComponent, AccountComponent],
  providers:[AuthServiceService, CommonService]
})
export class AdminModule { }
