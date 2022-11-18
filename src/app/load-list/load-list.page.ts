import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-load-list',
  templateUrl: './load-list.page.html',
  styleUrls: ['./load-list.page.scss'],
})
export class LoadListPage implements OnInit {
  quarryName : any;
  quarryId : any;
  loadList : any;
  loadEmpty: any = true;
  constructor( private toastController: ToastController, public loadingCtrl: LoadingController, private alertcontroller: AlertController, private httpClient: HttpClient, private router: Router) { 
    this.quarryName = localStorage.getItem("quarryName");
    this.quarryId = localStorage.getItem("quarryId");
    
  }

  ngOnInit() {
    this.fetchLoadList();
  }

  ionViewWillEnter() {
    this.fetchLoadList();
  }

  fetchLoadList() {
    this.httpClient.get(quarryApi+'/getAllLoads/'+this.quarryId).subscribe(data => {
      this.loadList = data;
      if(this.loadList.length > 0) {
        this.loadEmpty = false;
      }
    });
  }

  onView(loadId: any) {
    this.router.navigate(['tabs/load-details'],{ queryParams: { loadId : loadId } }); 
  }

  async updatePaymentStatus(loadId: any) {
    const alert = await this.alertcontroller.create({
      header: 'Are you sure want to update the payment status to SUCCESS!!!',
      buttons: [
        {
          text: 'No',
          role: 'no',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.loadCtrl();
            this.httpClient.get(quarryApi+'/admin/editPaymentStatus/'+loadId).subscribe(response => {
              this.loadingCtrl.dismiss();
              console.log(response);
              this.fetchLoadList();
              this.msgToast("Payment Status Updated Successfully!!!")
            },error => {
              this.loadingCtrl.dismiss();
              this.errorToast();
            });  
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async loadCtrl() {
    const loading = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await loading.present();
  }

  async msgToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'success',
      buttons: [{
        side: "end",
        icon: "thumbs-up"
      }
      ]
    });
    await toast.present();
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
