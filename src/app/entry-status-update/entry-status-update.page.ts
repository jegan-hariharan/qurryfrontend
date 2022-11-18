import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-entry-status-update',
  templateUrl: './entry-status-update.page.html',
  styleUrls: ['./entry-status-update.page.scss'],
})
export class EntryStatusUpdatePage implements OnInit {
  quarryId : any = "";
  quarryName : any = "";
  truckId: any;
  truckInfo: any;
  entryInfo: any;
  isEmpty: boolean = false;
  constructor(private datepipe: DatePipe,private toastController: ToastController,private activaterouter: ActivatedRoute ,private router: Router, private httpClient: HttpClient, private alertcontroller: AlertController) { 
    this.quarryName = localStorage.getItem('quarryName');
    this.activaterouter.queryParams.subscribe(param => {
      console.log(param);
      this.quarryId = param.quarryId,
      this.truckId = param.truckId,
      this.truckDetails();
    });
  }

  ngOnInit() { 
    console.log(this.quarryId);
    console.log(this.truckId);
    
  }
  ionViewWillEnter() {

  }
  truckDetails(){ 
    this.httpClient.get(quarryApi+'/vehicle/'+this.truckId+'/'+this.quarryId,).subscribe(data => {
      this.truckInfo = data;
      console.log(this.truckInfo);
      this.isEmpty = true;
    }) 
  }

  onClickGeneratePass() {
    console.log(this.truckInfo);
    const postData = {
      quarryId: this.truckInfo.quarryId,
      ownerId: this.truckInfo.ownerId,
      truckId: this.truckInfo.truckId,
      driverId: this.truckInfo.driverId,
      entryStatus: false, //Entry In status - false
      loadStatus: false //Load Status - false
    };
    this.httpClient.post(quarryApi+'/generate-truck-entry-pass/', postData).subscribe(data => {
      this.entryInfo = data;
      this.presentAlert();
    } ,error => {
      this.errorToast();      
    }); 
  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Entry pass '+this.entryInfo.loadId+' is generated successfully',
      subHeader: "Truck In time: "+this.datepipe.transform(this.entryInfo.vehicleInTime, 'dd-MM-yyyy hh:mm a'),
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.router.navigate(['tabs/entry-pass'], { queryParams: { } });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: "Something went wrong",
      duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [{
        side: "end",
        icon: "thumbs-down"
      }

      ]
    });
    await toast.present();
  }

}
