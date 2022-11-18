import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  userId: any;
  requestData: any;
  reData: any;
  roleId: any;

  constructor(private route:ActivatedRoute,private router:Router, private loadingCtrl: LoadingController) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(){
  }

  ionViewWillEnter() {
    this.roleId = localStorage.getItem('roleId');
  }
}
