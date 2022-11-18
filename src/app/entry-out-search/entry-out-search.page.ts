import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-entry-out-search',
  templateUrl: './entry-out-search.page.html',
  styleUrls: ['./entry-out-search.page.scss'],
})
export class EntryOutSearchPage implements OnInit {
  serviceSearchForm: FormGroup;
  quarryName : string;
  vehicleList : any;
  vehicleEmpty : boolean;
  quarryId: any;

  constructor(private browser: BrowserModule,private fb: FormBuilder, private loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.quarryName = localStorage.getItem('quarryName');
    this.quarryId = localStorage.getItem('quarryId');
    this.vehicleEmpty = false;
    this.serviceSearchForm = this.fb.group({
      vehicle: ['', Validators.required],
    })
  }

  onClickSearchLocation(event) {
    console.log(event.target.value);
    let vehicle = {
      'vehicle': event.target.value
    }
    if (vehicle.vehicle != '') {
      this.httpClient.get(quarryApi+'/search-entered-vehicle/'+vehicle.vehicle).subscribe(data => {
        this.vehicleList = data;
        this.vehicleEmpty = this.vehicleList.length > 0 ? false : true;
        console.log(this.vehicleList);
      });
    } else {
      this.vehicleEmpty = false;
    }
  }

  onButtonClick(url: any) {
    console.log(url);
    this.router.navigate([url]);  
  }

  onClickVehicle(loadId: any) {
    console.log(loadId);
    console.log(this.quarryId)
    this.router.navigate(['tabs/entry-out-pass/'], { queryParams: { loadId: loadId} });
  }

}
