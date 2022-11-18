import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmitting = false;
  showPassword = false;
  toggleButton = 'eye';
  errorlabel: any;
  accessToken: any;
  adminId: any;
  managerId: any;
  employeeId: any;
  role: any;
  roleId: any;
  userName: any;
  quarryList: any;
  quarryId: any;

  private userLoginForm: FormGroup;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private router: Router, public toastController: ToastController, public loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      userRole: ['', [Validators.required]],
      userMail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]]
    });
  }
  get f() { return this.userLoginForm.controls; }

  async onLogin(credentialDetails: any) {
    console.log(credentialDetails);
    this.isSubmitting = true;
    if (this.userLoginForm.valid) {
      this.loadCtrl();
      const postData = {
        "role": credentialDetails.userRole,
        "email": credentialDetails.userMail,
        "password": credentialDetails.userPassword
      }
      this.httpClient.post(quarryApi+'/'+credentialDetails.userRole+'/login', postData).subscribe(response => {
        this.userLoginForm.reset();
        this.loadingCtrl.dismiss();
        console.log(response);
        this.accessToken = response['accessToken'];
        this.role=response['role'];
        this.roleId=response['roleId'];
        localStorage.setItem("access_token", this.accessToken);
        localStorage.setItem("role", this.role);
        localStorage.setItem("roleId", this.roleId);
        if(response['roleId'] == 1) {
          this.userName=response['adminName'];
          this.adminId = response['adminId'];
          localStorage.setItem("adminId", this.adminId);
          localStorage.setItem("userName", this.userName);
          this.httpClient.get(quarryApi+'/allQuarry/'+this.role+'/'+this.adminId).subscribe(data => {
              this.quarryList = data;
              if(this.quarryList.length) {
                this.router.navigate(['/tabs/tab2'], { state: { username: this.userName } });
              } else {
                this.userLoginForm.reset();
                this.router.navigate(['create-quarry'], { state: { username: this.userName } });
              }
          } ,error => {
            this.isSubmitting = false;
            this.loadingCtrl.dismiss();
            if (error.status == 400) { 
              this.errorlabel = error.error.details[0];
              this.errorToast(this.errorlabel);
            }
          });
        } else if(response['roleId'] == 2) {
          this.managerId = response['managerId'];
          this.quarryId = response['quarryId'];
          localStorage.setItem("managerId", this.managerId);
          localStorage.setItem("quarryId", this.quarryId);
          this.router.navigate(['/tabs/tab2'], { state: { username: this.userName } });
        } else {
          this.employeeId = response['employeeId'];
          this.quarryId = response['quarryId'];
          localStorage.setItem("employeeId", this.employeeId);
          localStorage.setItem("quarryId", this.quarryId);
          this.router.navigate(['/tabs/tab2'], { state: { username: this.userName } });
        }
      } ,error => {
        this.loadingCtrl.dismiss();
        this.isSubmitting = false
        if (error.status == 400 ) { 
          this.errorlabel = error.error.details[0];
          this.errorToast(this.errorlabel);
        } else if(error.status == 401) {
          this.errorlabel = "Email id or passowrd invalid";
          this.errorToast(this.errorlabel);
        }
      });
    }
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Logged in Successfully',
      duration: 2000,
      position: 'top',
      color: 'success',
      buttons: [{
        side: "end",
        icon: "thumbs-up"
      }]
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
    this.loadingCtrl.dismiss();
    await toast.present();
  }
  async loadCtrl() {
    const loading = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await loading.present();
  }

  toggleChanges(): void {
    this.showPassword = !this.showPassword;
    if (this.toggleButton == 'eye') {
      this.toggleButton = 'eye-off';
    } else {
      this.toggleButton = 'eye';
    }
  }
}
