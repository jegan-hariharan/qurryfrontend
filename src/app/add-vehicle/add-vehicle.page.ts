import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit {
  quarryId : any;
  quarryName : string;
  addVehicleForm: FormGroup;
  isSubmitting: boolean = false;
  errorlabel: any;
  handlerMessage: string;
  truckDetails: any;
  truckOwnerDetails: any;
  
  constructor(
    private fb: FormBuilder, 
    private loadingCtrl: LoadingController, 
    private httpClient: HttpClient, 
    private router: Router, 
    public toastController: ToastController,
    public alertcontroller: AlertController) { 
    }

  ngOnInit() {
    this.quarryName = localStorage.getItem('quarryName');
    this.quarryId = localStorage.getItem('quarryId');
    this.fetchAllTruckOwner();
    this.addVehicleForm = this.fb.group({
      ownerName: ['', Validators.required],
      vehicleNo: ['', [Validators.required]],
      vehicleCapacity: ['', [Validators.required]],
      driverName: ['', [Validators.required]],      
      driverMobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }

  ionViewWillEnter() {
  }

  get f() { return this.addVehicleForm.controls; }
  onSubmit(vehicleDetails: any) {
    // this.loadCtrl();
    this.isSubmitting = true;
    if (this.addVehicleForm.valid) {
      const postData = {
        truckOwnerId: vehicleDetails.ownerName,
        truckNo: vehicleDetails.vehicleNo,
        truckCapacity : vehicleDetails.vehicleCapacity,
        truckDriverName: vehicleDetails.driverName,
        truckDriverMobile: vehicleDetails.driverMobileNumber,
      };
      console.log(postData);
      this.httpClient.post(quarryApi+'/admin/addVehicle/'+this.quarryId, postData).subscribe(response => {
        // this.loadingCtrl.dismiss();
        this.truckDetails = response;
        this.presentAlert();   
      } ,error => {
        // this.loadingCtrl.dismiss();
        this.isSubmitting = false
        if (error.status == 400 ) { 
          this.errorlabel = error.error.details[0];
          this.errorToast(this.errorlabel);
        } else {
          this.errorToast("Something went Wrong");
        }
      })
    } ;
  }

  fetchAllTruckOwner() {
    // this.loadCtrl();
    this.httpClient.get(quarryApi+'/admin/getAllOwner/'+this.quarryId).subscribe(response => {
      // this.loadingCtrl.dismiss();
      this.truckOwnerDetails = response;
    } ,error => {
            this.errorToast("Truck Owner is missing");
    })
  }

  async msgToast() {
    const toast = await this.toastController.create({
      message: 'Vechile Added successfully',
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

  async errorToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
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
    const alert = await this.alertcontroller.create({
      header: 'Vehicle details added successfully!',
      subHeader: "Do you want to generate entry pass for the vehicle?",
      buttons: [
        {
          text: 'No',
          role: 'no',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.addVehicleForm.reset();
            this.router.navigate(['tabs/entry-status-update/'], { queryParams: { quarryId: this.quarryId, truckId: this.truckDetails.truckId} });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
