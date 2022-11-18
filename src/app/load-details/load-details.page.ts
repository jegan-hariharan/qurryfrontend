import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-load-details',
  templateUrl: './load-details.page.html',
  styleUrls: ['./load-details.page.scss'],
})
export class LoadDetailsPage implements OnInit {
  quarryName: string;
  loadDetail: any;
  loadId: any;
  loadInfo: any;
  loadStatus: any;
  entryStatus: any;
  isEmpty: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router, private activaterouter: ActivatedRoute) { 
    this.quarryName = localStorage.getItem("quarryName");
    this.activaterouter.queryParams.subscribe(param => {
      console.log(param);
      this.loadId = param.loadId;
      this.loadDetails();
    });  
  }

  ngOnInit() {
      
  }

  ionViewWillEnter() {
    
  }

  loadDetails(){
    this.httpClient.get(quarryApi+'/loadDetails/'+this.loadId).subscribe(data => {
      this.isEmpty = true;
      this.loadInfo = data;
      this.loadStatus = this.loadInfo.loadStatus == false ? 'Unloaded' : 'Loaded';
      this.entryStatus = this.loadInfo.entryStatus == false ? 'IN' : 'Out';
      console.log(this.loadInfo);
    }); 
  }

}
