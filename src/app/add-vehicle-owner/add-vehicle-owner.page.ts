import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-add-vehicle-owner',
  templateUrl: './add-vehicle-owner.page.html',
  styleUrls: ['./add-vehicle-owner.page.scss'],
})
export class AddVehicleOwnerPage implements OnInit {
  quarryId : any;
  quarryName : string;
  addVehicleOwnerForm: FormGroup;
  isSubmitting: boolean = false;
  errorlabel: any;
  constructor(
    private fb: FormBuilder, 
    private loadingCtrl: LoadingController, 
    private httpClient: HttpClient, 
    private router: Router, 
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.quarryName = localStorage.getItem('quarryName');
    this.quarryId = localStorage.getItem('quarryId');
    this.addVehicleOwnerForm = this.fb.group({
      ownerName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],  
      fullAddress: ['', [Validators.required]],
    });
  }

  get f() { return this.addVehicleOwnerForm.controls; }
  onSubmit(vehicleOwnerDetails: any) {
    // this.loadCtrl();
    this.isSubmitting = true;
    if (this.addVehicleOwnerForm.valid) {
      const postData = {
        quarryId: this.quarryId,
        truckOwnerName: vehicleOwnerDetails.ownerName,
        truckOwnerMobileNo: vehicleOwnerDetails.phoneNumber.toString(),
        truckOwnerAddress: vehicleOwnerDetails.fullAddress,
      };
      this.httpClient.post(quarryApi+'/admin/addVehicleOwner', postData).subscribe(response => {
        this.loadingCtrl.dismiss();
        console.log(response);  
        this.msgToast();
        this.addVehicleOwnerForm.reset();
        this.router.navigate(['/tabs/add-vehicle']);
      } ,error => {
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

  async msgToast() {
    const toast = await this.toastController.create({
      message: 'Vehicle Owner Added successfully',
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
}
