import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  formData: any;
  forgotPasswordForm: FormGroup;
  verificationCodeForm: FormGroup;
  createNewPasswordForm: FormGroup;
  forgotPasswordEnable: boolean = false;
  verificationEnable: boolean = false;
  updatePasswordEnable: boolean = false;
  dynamicFormArray: Object;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private loadingCtrl: LoadingController, private toastController: ToastController) { }
  ngOnInit() {
    const pwdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{1,}$";
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.verificationCodeForm = this.fb.group({
      verifyCode: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]]
    })
    this.createNewPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(pwdPattern)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(pwdPattern)]],
    })
  }
  onSubmit(data: any) {
    this.loadCtrl();
    localStorage.removeItem('resetLink');
    let emailDetails = {
      'email': data.email
    }
    localStorage.setItem('email', data.email)
    this.httpClient.post(quarryApi+'/admin/forgot_password', emailDetails).subscribe(res => {
      this.loadingCtrl.dismiss();
      if (res['status'] === true) {
        this.successToast();
        this.verificationEnable = true;
        this.forgotPasswordEnable = true;
      }
    },
      error => {
        this.loadingCtrl.dismiss();
        // this.errorToast();
      })
  }
  verifyCheck(code: any) {
    this.loadCtrl();
    let verificationDetails = {
      'verificationCode': code.verifyCode,
      'email': localStorage.getItem('email')
    }
    this.httpClient.post(quarryApi+'/admin/forgot_password', verificationDetails).subscribe(res => {
      this.loadingCtrl.dismiss();
      if (res['status'] === true) {
        this.successToastVerification();
        this.updatePasswordEnable = true;
        this.verificationEnable = false;
        this.forgotPasswordEnable = true;
        this.verificationCodeForm.reset();
      } else {
        this.forgotPasswordEnable = false;
      }
      console.log(res);
    },
      error => {
        this.loadingCtrl.dismiss();
        this.errorToastCode();
        this.router.navigate(['/auth']);
        this.forgotPasswordEnable = false;
        this.verificationCodeForm.reset();
      })
  }
  updateNewPassword(password: any) {
    let newPasswordDetails = {
      'password': password.confirmNewPassword,
      'email': localStorage.getItem('email')
    }
    if (password.newPassword == password.confirmNewPassword) {
      this.loadCtrl();
      this.httpClient.post(quarryApi+'/admin/forgot_password', newPasswordDetails).subscribe(res => {
        this.loadingCtrl.dismiss();
        if (res['status'] === true) {
          this.successToastUpdated();
          this.router.navigate(['/auth']);
        }
      })
    }
    else {
      this.loadingCtrl.dismiss();
      this.errorToastCorrectPassword();
    }
  }
  async loadCtrl() {
    const loading = this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await (await loading).present();
  }
  async errorToast() {
    const toast = await this.toastController.create({
      message: 'User doesnt exists',
      duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [{
        side: "end",
        icon: "thumbs-down"
      }]
    });
    await toast.present();
  }
  async errorToastCode() {
    this.loadingCtrl.dismiss();
    const toast = await this.toastController.create({
      message: 'Please try again, code mismatched',
      duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [{
        side: "end",
        icon: "thumbs-down"
      }]
    });
    await toast.present();
  }
  async errorToastPassword() {
    const toast = await this.toastController.create({
      message: 'Please enter valid code.',
      duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [{
        side: "end",
        icon: "thumbs-down"
      }]
    });
    await toast.present();
  }
  async errorToastCorrectPassword() {
    const toast = await this.toastController.create({
      message: 'Please enter same password',
      duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [{
        side: "end",
        icon: "thumbs-down"
      }]
    });
    await toast.present();
  }
  async successToast() {
    const toast = await this.toastController.create({
      message: 'code sent your email',
      duration: 2000,
      position: 'top',
      color: 'success',
      buttons: [{
        side: "end",
        icon: "thumbs-up"
      }
      ]
    });
    toast.present();
  }
  async successToastVerification() {
    const toast = await this.toastController.create({
      message: 'User verification successfully',
      duration: 2000,
      position: 'top',
      color: 'success',
      buttons: [{
        side: "end",
        icon: "thumbs-up"
      }
      ]
    });
    toast.present();
  }
  async successToastUpdated() {
    const toast = await this.toastController.create({
      message: 'Password updated successfully',
      duration: 2000,
      position: 'top',
      color: 'success',
      buttons: [{
        side: "end",
        icon: "thumbs-up"
      }
      ]
    });
    toast.present();
  }
}
