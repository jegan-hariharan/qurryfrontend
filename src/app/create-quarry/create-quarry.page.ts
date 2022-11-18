import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-create-quarry',
  templateUrl: './create-quarry.page.html',
  styleUrls: ['./create-quarry.page.scss'],
})
export class CreateQuarryPage implements OnInit {

  createQuarryForm: FormGroup;
  isSubmitting: boolean = false;
  errorlabel: any;

  constructor(private fb: FormBuilder, private loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.createQuarryForm = this.fb.group({
      quarryName: ['', Validators.required],
      quarryOwner: ['', [Validators.required]],
      quarryMail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      fullAddress: ['', [Validators.required]],
      quarryGstn: ['', [Validators.required]],    
      quarryLicense: ['', [Validators.required]],
      quarryValidity: ['', [Validators.required]],
    });
  }
  get f() { return this.createQuarryForm.controls; }

  onSubmit(quarryDetails: any) {
    this.isSubmitting = true
    if (this.createQuarryForm.valid) {
        //this.loadCtrl();
        const postData = {
          quarryName: quarryDetails.quarryName,
          quarryOwnerName: quarryDetails.quarryOwner,
          quarryMobileNumber: quarryDetails.phoneNumber.toString(),
          quarryEmail: quarryDetails.quarryMail,
          quarryAddress: quarryDetails.fullAddress,
          quarryGstn: quarryDetails.quarryGstn,
          quarryLicense: quarryDetails.quarryLicense,
          quarryValidity: quarryDetails.quarryValidity,
          adminId: localStorage.getItem("adminId"),
        };
        this.httpClient.post(quarryApi+'/admin/quarryinfo', postData).subscribe(response => {
          this.createQuarryForm.reset();
          console.log(response);
          //this.loadingCtrl.dismiss();
          localStorage.setItem("quarryId", response['quarryId']);
          localStorage.setItem("userName", response['userName']);
          this.router.navigate(['/tabs/tab2'], { state: { username: response['userName'] } });
          this.msgToast();
        } ,error => {
          //this.loadingCtrl.dismiss();
          this.isSubmitting = false
          if (error.status == 400) { 
            this.errorlabel = error.error.details[0];
            this.errorToast(this.errorlabel);
          }
        });
    } 
  }

  async msgToast() {
    const toast = await this.toastController.create({
      message: 'Quarry created successfully!',
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
