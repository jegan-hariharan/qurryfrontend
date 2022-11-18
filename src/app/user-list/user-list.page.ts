import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  quarryId: any;
  usersList: any;
  isEmpty: boolean = true;
  managerListCount: any;
  employeeListCount: any;
  constructor(public loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router,private activaterouter: ActivatedRoute) {
    this.activaterouter.queryParams.subscribe(param => {
      this.quarryId = param.quarryId
      this.userList();
    });
    
   }

   userList() {
    this.loadCtrl();
    this.httpClient.get(quarryApi+'/admin/userList/'+this.quarryId).subscribe(data => {
      this.isEmpty = false;
      this.loadingCtrl.dismiss();
      this.usersList = data;
      this.managerListCount = this.usersList.managerList.length;
      this.employeeListCount = this.usersList.employeeList.length;
    }, error => {
      this.loadingCtrl.dismiss();
    });
   }

  ngOnInit() {

  }

  createUser() {
    this.router.navigate(['tabs/create-user'], { queryParams: { quarryId: this.quarryId }});
  }

  editUser(id: any, role: any) {
    this.router.navigate(['tabs/edit-user'], { queryParams: { id: id, role: role }});
  }

  async loadCtrl() {
    const loading = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await loading.present();
  }

  
}
