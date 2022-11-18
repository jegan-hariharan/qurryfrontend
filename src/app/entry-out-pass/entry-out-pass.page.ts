import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-entry-out-pass',
  templateUrl: './entry-out-pass.page.html',
  styleUrls: ['./entry-out-pass.page.scss'],
})
export class EntryOutPassPage implements OnInit {
  quarryId : any = "";
  quarryName : any = "";
  loadId: any;
  loadInfo: any;
  exitInfo: any;
  loadStatus: string;
  entryStatus: string;
  constructor(private datepipe: DatePipe,private toastController: ToastController,private activaterouter: ActivatedRoute ,private router: Router, private httpClient: HttpClient, private alertcontroller: AlertController) { 
  }

  ngOnInit() { 
    this.quarryName = localStorage.getItem('quarryName');
    this.activaterouter.queryParams.subscribe(param => {
      console.log(param);
      this.loadId = param.loadId,
      this.truckDetails();
    });
    console.log(this.loadId);
  }
  truckDetails(){
    this.httpClient.get(quarryApi+'/loadDetails/'+this.loadId).subscribe(data => {
      this.loadInfo = data;
      this.loadStatus = this.loadInfo.loadStatus == false ? 'Unloaded' : 'Loaded';
      this.entryStatus = this.loadInfo.entryStatus == false ? 'IN' : 'Out';
      console.log(this.loadInfo);
    } ,error => {
      this.errorToast();
    }) 
  }

  onClickGeneratePass() {
    console.log(this.loadInfo);
    this.httpClient.get(quarryApi+'/truck-exit/'+this.loadInfo.loadId).subscribe(data => {
      this.exitInfo = data;
      this.presentAlert();
    } ,error => {
      this.errorToast();      
    }); 
  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Entry pass #'+this.exitInfo.loadId+' is closed successfully!',
      subHeader: "Truck out time: "+this.datepipe.transform(this.exitInfo.vehicleOutTime, 'dd-MM-yyyy hh:mm a'),
      buttons: [
        {
          text: '',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            return false;
          }
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.truckDetails();
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
