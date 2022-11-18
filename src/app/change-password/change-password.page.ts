import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  updatePasswordForm: FormGroup;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  oldPasswordButton = 'eye';
  newPasswordButton = 'eye';
  confirmPasswordButton = 'eye';
  roleId: any;
  role: any;
  userId: any;
  constructor(private http: HttpClient, public toastController: ToastController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    if(this.roleId == 1) {
      this.role = "admin";
      this.userId = Number(localStorage.getItem('adminId'));
    } else if(this.roleId == 2) {
      this.role = "manager";
      this.userId = Number(localStorage.getItem('managerId'));
    } else {
      this.role = "employee";
      this.userId = Number(localStorage.getItem('employeeId'));
    } 
    const pwdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{1,}$";
    this.updatePasswordForm = new FormGroup({
      "oldPassword": new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern(pwdPattern)]),
      "newPassword": new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern(pwdPattern)]),
      "confirmPassword": new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern(pwdPattern)])
    })
  }

  updatePassword() {
    let updateData = {
      userId: this.userId,
      currentPassword: this.updatePasswordForm.get('oldPassword').value,
      newPassword: this.updatePasswordForm.get('newPassword').value,
      confirmPassword: this.updatePasswordForm.get('confirmPassword').value,
    }

    if (updateData.newPassword == updateData.confirmPassword) {
      this.loadCtrl();
      this.http.post(quarryApi+'/'+this.role+'/change_password', updateData).subscribe(data => {
        console.log(data);
        if (data['status'] === true) {
          this.loadingCtrl.dismiss();
          this.successToast();
          window.history.back();
        } else {
         this.loadingCtrl.dismiss();
          this.errorToast();
        }
      },error => {
          this.loadingCtrl.dismiss();
          this.errorToast();
      });
    } else {
      this.loadingCtrl.dismiss();
      this.passwordMismatch();
    }
    console.log(this.updatePasswordForm.value);

  }
  async passwordMismatch() {
    const toast = await this.toastController.create({
      message: 'Password mismatch. Please type correct Password',
      duration: 2000,
      position: 'top',
      color: 'warning',
      buttons: [{
        side: "end",
        icon: "alert-circle"
      }

      ]

    });
    toast.present();

  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'change password updated Successfully',
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



  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Type correct old password',
      duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [{
        side: "end",
        icon: "thumbs-down"
      }

      ]
    });
    toast.present();
  }


  async loadCtrl() {
    const loading = this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await (await loading).present();
  }

  oldPasswordChanges(): void {
    this.showOldPassword = !this.showOldPassword;
    if (this.oldPasswordButton == 'eye') {
      this.oldPasswordButton = 'eye-off';
    } else {
      this.oldPasswordButton = 'eye';
    }
  }

  newPasswordChanges(): void {
    this.showNewPassword = !this.showNewPassword;
    if (this.newPasswordButton == 'eye') {
      this.newPasswordButton = 'eye-off';
    } else {
      this.newPasswordButton = 'eye';
    }
  }

  confirmPasswordChanges(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    if (this.confirmPasswordButton == 'eye') {
      this.confirmPasswordButton = 'eye-off';
    } else {
      this.confirmPasswordButton = 'eye';
    }
  }
}
