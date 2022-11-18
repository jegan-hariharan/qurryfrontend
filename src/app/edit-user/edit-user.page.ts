import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  id: any;
  role: any;
  usersDetails: any;
  editUserForm: FormGroup;
  isSubmitting: boolean = false;
  errorLabel: any;
  constructor(public loadingCtrl: LoadingController, private fb: FormBuilder, private activaterouter: ActivatedRoute, private httpClient: HttpClient, public toastController: ToastController) {
    this.activaterouter.queryParams.subscribe(param => {
      this.id = param.id,
      this.role = param.role
      this.fetchUser();
    });
   }
   fetchUser() {
    this.loadCtrl();
    this.httpClient.get(quarryApi+'/getUserDetail/'+this.id+'/'+this.role).subscribe(data => {
      this.loadingCtrl.dismiss();
      this.usersDetails = data;
      console.log(this.usersDetails,this.role);
      this.editUserForm.controls['role'].setValue(this.role);
      this.editUserForm.controls['email'].setValue(this.usersDetails.email);
      this.editUserForm.controls['name'].setValue(this.usersDetails.name);
      this.editUserForm.controls['phoneNumber'].setValue(this.usersDetails.phone);
      this.editUserForm.controls['gender'].setValue(this.usersDetails.gender);
      this.editUserForm.controls['status'].setValue(this.usersDetails.isActive);
    });
   }

  ngOnInit() {
    this.editUserForm = this.fb.group({
      role: [''],
      name: ['', Validators.required],
      email: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      status: [''],
      gender: [''],
    });
  }

  get f() { return this.editUserForm.controls; }

  onSubmit(userDetails: any) {
    console.log(userDetails);
    this.isSubmitting = true;
    if (this.editUserForm.valid) {
      this.loadCtrl();
      const postData = {
        role: this.role,
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber.toString(),
        gender: userDetails.gender,
        isActive: userDetails.status, 
      }
      this.httpClient.put(quarryApi+'/userEdit/'+this.id, postData).subscribe(response => {
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
      message: 'User Updated successfully!!!',
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
    await toast

}

async loadCtrl() {
  const loading = await this.loadingCtrl.create({
    showBackdrop: true,
    spinner: 'lines'
  });
  await loading.present();
}
}
