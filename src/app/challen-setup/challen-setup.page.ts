import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-challen-setup',
  templateUrl: './challen-setup.page.html',
  styleUrls: ['./challen-setup.page.scss'],
})
export class ChallenSetupPage implements OnInit {

  challanCostForm: FormGroup;
  quarryId: any;
  quarryName: any;
  isSubmitting: boolean = false;
  handlerMessage: string;
  roleMessage: string;
  challanCostList: any;
  recordNull: boolean = true;
  latestUpdatedPrice : any = 0.00;
  constructor(private activaterouter: ActivatedRoute, private alertController: AlertController, private fb: FormBuilder,private loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router, public toastcontorller: ToastController) {
    this.quarryName = localStorage.getItem('quarryName');
    this.activaterouter.queryParams.subscribe(param => {
      this.quarryId = param.quarryId,
      this.fetchAllChallanCost();
    });
    
  }

  ngOnInit() {
    this.challanCostForm = this.fb.group({
      cost: ['', Validators.required],
      
    });
  }
  get f() { return this.challanCostForm.controls; }

  onSubmit(costValue: any) {
    this.isSubmitting = true;
    if (this.challanCostForm.valid) {
      const postData = {
        challanCost: costValue.cost,
        quarryId: this.quarryId,
      };
      this.presentAlert(postData);
    }
  }

  async presentAlert(postData) {
    const alert = await this.alertController.create({
      header: 'Are you sure want to update the challan cost?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert no';
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.loadCtrl();
            this.httpClient.post(quarryApi+'/admin/challanCostInfo', postData).subscribe(response => {
              console.log(response);
              this.loadingCtrl.dismiss();
              this.msgToast();
              this.challanCostForm.reset();
              this.isSubmitting = false;
              this.fetchAllChallanCost();
            } ,error => {
              this.loadingCtrl.dismiss();
              this.isSubmitting = false
              this.errorToast();
            });
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  fetchAllChallanCost() {
    this.latestUpdatedPrice = 0.00;
    this.recordNull = true;
    this.loadCtrl();
    this.httpClient.get(quarryApi+'/admin/getChallanCost/'+this.quarryId).subscribe(response => {
      this.loadingCtrl.dismiss();
      console.log(response);
      this.challanCostList = response;
      if(this.challanCostList.length) {
        this.recordNull = false;
        this.latestUpdatedPrice = this.challanCostList[0]['challanCost'];
      }
    });
  }

  async msgToast() {
    const toast = await this.toastcontorller.create({
      message: 'Cost updated successfully.',
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
    const toast = await this.toastcontorller.create({
      message: "Something went wrong.",
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

  async loadCtrl() {
    const loading = this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await (await loading).present();
  }

}
