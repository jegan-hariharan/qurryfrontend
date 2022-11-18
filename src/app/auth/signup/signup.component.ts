import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userSignupForm: FormGroup;
  isSubmitting: boolean = false;
  quarryList: {};
  errorlabel: any;
  accessToken: any;

  constructor(private fb: FormBuilder, private loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    const pwdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{1,}$";
    this.userSignupForm = this.fb.group({
      // quarry: ['', Validators.required],
      fullName: ['', Validators.required],
      userMail: ['', [Validators.required, Validators.email]],
      fullAddress: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(pwdPattern)]],
      confirmPassword: ['', [Validators.required]],
      
    });
    // this.fetchSAllQuarry();
  }
  get f() { return this.userSignupForm.controls; }

  // fetchSAllQuarry(){
  //   this.httpClient.get(quarryApi+'/allQuarry').subscribe(response => {
  //     this.quarryList = response;
  //     console.log(this.quarryList);        
  //   } ,error => {
  //     this.loadingCtrl.dismiss();
  //     this.isSubmitting = false
  //     if (error.status == 404) { 
  //       this.errorlabel = error.error.details[0];
  //       this.errorToast(this.errorlabel);
  //     }
  //   });  
  // }

  onSubmit(userDetails: any) {
    this.isSubmitting = true
    if (this.userSignupForm.valid) {
      if(userDetails.password != userDetails.confirmPassword) {
        this.passwordMismatch();  
        this.loadingCtrl.dismiss();
        this.isSubmitting = false
      } else {
        this.loadCtrl();
        const postData = {
          // quarryId: Number(userDetails.quarry),
          name: userDetails.fullName,
          email: userDetails.userMail,
          address: userDetails.fullAddress,
          phone: userDetails.phoneNumber.toString(),
          username: userDetails.username,
          password: userDetails.password,
          // roleId: "2",
        };
        this.httpClient.post(quarryApi+'/admin/register', postData).subscribe(response => {
          this.userSignupForm.reset();
          console.log(response);
          this.loadingCtrl.dismiss();
          localStorage.setItem("access_token", response['accessToken']);
          localStorage.setItem("adminId", response['adminId']);
          localStorage.setItem("role", response['role']);
          localStorage.setItem("roleId", response['roleId']);
          localStorage.setItem("userName", response['adminName']);
          this.router.navigate(['/create-quarry'], { state: { username: response['adminName'] } });
          this.msgToast();
        } ,error => {
          this.loadingCtrl.dismiss();
          this.isSubmitting = false
          if (error.status == 400) { 
            this.errorlabel = error.error.details[0];
            this.errorToast(this.errorlabel);
          }
        });
      }
    } 
  }

  async passwordMismatch() {
    const toast = await this.toastController.create({
      message: 'Password Mismatches',
      duration: 2000,
      position: 'top',  
      color: 'warning',
      buttons: [{
        side: "end",
        icon: "alert-circle"
      }

      ]

    });
    await toast.present();

  }
  async msgToast() {
    const toast = await this.toastController.create({
      message: 'Registartion Successful',
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
