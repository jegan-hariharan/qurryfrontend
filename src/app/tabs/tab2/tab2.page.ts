import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  quarryList: any = [];
  adminId: any;
  role: any;
  roleId: any
  employeeId: string;
  managerId: string;
  constructor(private loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router, public toastController: ToastController) {
    this.roleId = localStorage.getItem("roleId");
    this.adminId = this.roleId == 1 ? localStorage.getItem("adminId") : null;
    this.managerId = this.roleId == 2 ? localStorage.getItem("managerId") : null;
    this.employeeId = this.roleId == 3 ? localStorage.getItem("employeeId") : null;    
  } 
  
  ngOnInit() {
    this.fetchAllQuarry();
  }

  ionViewWillEnter() {
    this.roleId = localStorage.getItem('roleId');
  }

  fetchAllQuarry(){
    if(this.roleId == 1) {
      
      this.httpClient.get(quarryApi+'/allQuarry/'+this.role+'/'+this.adminId).subscribe(data => {
        this.quarryList = data;
      }); 
    } else if(this.roleId == 2) {
      
      this.httpClient.get(quarryApi+'/getQuarryByManager/'+this.role+'/'+this.managerId).subscribe(data => {
        this.quarryList.push(data['quarry']);
        console.log(this.quarryList);
      }); 
    } else {
      
      this.httpClient.get(quarryApi+'/getQuarryByEmployee/'+this.role+'/'+this.employeeId).subscribe(data => {
        this.quarryList.push(data['quarry']);
        console.log(this.quarryList);
      }); 
    }
  }

  onClick(quarryInfo: any) {
    console.log(quarryInfo);
    localStorage.setItem('quarryId', quarryInfo.quarryId);
    localStorage.setItem('quarryName', quarryInfo.quarryName);
    if(this.roleId == 3) {
      this.router.navigate(['tabs/entry-pass'],{ queryParams: { quarryId : quarryInfo.quarryId } });
    } else {
      this.router.navigate(['/tabs/menu']);
    }
  }

  onView(quarryId: any) {
    this.router.navigate(['/tabs/quarry-details'],{ queryParams: { quarryId : quarryId } }); 
  }

  async loadCtrl() {
    const loading = this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines',
      duration: 1000,
    });
    await (await loading).present();
  }
}

