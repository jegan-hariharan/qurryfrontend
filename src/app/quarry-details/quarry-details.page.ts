import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-quarry-details',
  templateUrl: './quarry-details.page.html',
  styleUrls: ['./quarry-details.page.scss'],
})
export class QuarryDetailsPage implements OnInit {
  quarryName : any;
  quarryId: any;
  quarryDetails: any;
  loadingCtrl: any;
  roleId: any;
  quarryValidity: any;
  
  constructor(private datePipe: DatePipe,private activaterouter: ActivatedRoute, private toastController: ToastController, private httpClient: HttpClient, private alertcontroller: AlertController) { }
  
  ngOnInit() {  
    this.activaterouter.queryParams.subscribe(param => {
      console.log(param);
      this.quarryId = param.quarryId
    });
    
  }

  ionViewWillEnter() {
    this.roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
    this.fetchQuarryDetails();
  }

  fetchQuarryDetails(){
    this.httpClient.get(quarryApi+'/allQuarry/'+this.quarryId).subscribe(data => {
      console.log(data);
      this.quarryDetails = data;
      if(!this.quarryDetails.quarryId) {
        this.errorToast();
      }
    }); 
  }

  async msgToast() {
    const toast = await this.toastController.create({
      message: 'Infomation updated Successfully',
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

  async loadCtrl() {
    const loading = this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await (await loading).present();
  }

  async presentAlert() {
    this.quarryValidity = this.datePipe.transform(this.quarryDetails.quarryValidity, "dd/MM/YYYY");
    const alert = await this.alertcontroller.create({
      header: 'Update Quarry Information',
      message: "",
      inputs: [
        {
          placeholder: 'Quarry Name',
          value: this.quarryDetails.quarryName,
          name: 'quarryName'
        },
        {
          placeholder: 'Owner Name',
          value: this.quarryDetails.quarryOwnerName,
          name: 'quarryOwnerName',
        },
        {
          placeholder: 'Quarry GSTN',
          value: this.quarryDetails.quarryGstn,
          name: 'quarryGstn',
        },
        {
          placeholder: 'Quarry Email',
          value: this.quarryDetails.quarryEmail,
          name: 'quarryEmail',
        },
        {
          type: 'number',
          placeholder: 'Phone Number',
          attributes: {
            max: 10,
          },
          name: 'quarryMobileNumber',
          value: this.quarryDetails.quarryMobileNumber,
        },
        {
          type: 'textarea',
          placeholder: 'Quarry Address',
          value: this.quarryDetails.quarryAddress,
          name: 'quarryAddress'
        },
        {
          name: 'quarryValidity',
          type: 'date',
          value: this.quarryValidity,
        },
        {
          name: 'quarryLicense',
          value: this.quarryDetails.quarryLicense,
          placeholder: "License No."
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => { 
            if(data.quarryName == "") {
              alert.message = "*Quarry name is required";
              return false;
            }
            if(data.quarryOwnerName == "") {
              alert.message = "*Quarry owner name is required";
              return false;
            }
            if(data.quarryGstn == "") {
              alert.message = "*Quarry owner name is required";
              return false;
            }
            if(data.quarryEmail == "") {
              alert.message = "*Quarry Email is required";
              return false;
            }
            if(data.quarryMobileNumber == "") {
              alert.message = "*Quarry phone number is required";
              return false;
            }
            if(data.quarryMobileNumber.length < 10 || data.quarryMobileNumber.length > 10) {
              alert.message = "*Quarry phone number should be 10 digit";
              return false;
            }
            if(data.quarryAddress == "") {
              alert.message = "*Quarry address is required";
              return false;
            }
            if(data.quarryValidity == "") {
              alert.message = "*Quarry Validity is required";
              return false;
            }
            if(data.quarryLicense == "") {
              alert.message = "*Quarry License is required";
              return false;
            }
            this.httpClient.put(quarryApi+'/allQuarry/'+this.quarryId, data).subscribe(data => {
              this.fetchQuarryDetails();
              this.msgToast()
            },error => {
              this.errorToast();
            }); 
          }
        }
      ]
    });

    await alert.present();
  }
}
