import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  quarryId: any;
  createUserForm: FormGroup;
  isSubmitting: boolean = false;
  errorLabel: any;
  constructor(public loadingCtrl: LoadingController, private fb: FormBuilder, private activaterouter: ActivatedRoute, private httpClient: HttpClient, public toastController: ToastController) {
    this.activaterouter.queryParams.subscribe(param => {
      this.quarryId = param.quarryId
    });
   }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      status: [''],
      gender: [''],
    });
  }

  get f() { return this.createUserForm.controls; }

  onSubmit(userDetails: any) {
    console.log(userDetails);
    this.isSubmitting = true;
    if (this.createUserForm.valid) {
      this.loadCtrl();
      const postData = {
        role: userDetails.role,
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber.toString(),
        gender: userDetails.gender,
        isActive: true, 
        quarryId : this.quarryId
      }
      this.httpClient.post(quarryApi+'/'+postData.role+'/userCreation', postData).subscribe(response => {
        this.loadingCtrl.dismiss();
        console.log(response);
        this.msgToast();    
      } ,error => {
        this.loadingCtrl.dismiss();
        if (error.status == 400) { 
          this.errorLabel = error.error.details[0];
          this.errorToast(this.errorLabel);
        }
      }); 
    }
  }

  async msgToast() {
    const toast = await this.toastController.create({
      message: 'User created successfully!!!',
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
    const loading = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await loading.present();
  }
}
