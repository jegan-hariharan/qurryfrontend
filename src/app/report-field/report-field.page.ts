import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
import { AlertController } from '@ionic/angular';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-report-field',
  templateUrl: './report-field.page.html',
  styleUrls: ['./report-field.page.scss'],
})
export class ReportFieldPage implements OnInit {
  filterForm: FormGroup;
  quarryName: string;
  quarryId: any;
  productList: any;
  ownerList: any;
  isResponseEmpy: boolean = true;
  filterList: Object;
  filterValue: any;

  constructor(public loadingCtrl: LoadingController, private alertcontroller: AlertController, private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private activaterouter: ActivatedRoute, private toastController: ToastController) {
    this.quarryName = localStorage.getItem('quarryName');
    this.activaterouter.queryParams.subscribe(param => {
      this.quarryId = param.quarryId
    });
   }

  ngOnInit() {
    this.filterForm = this.fb.group({
      productId: [''],
      ownerId: [''],
      paymentType: [''],
      paymentStatus: [''],
      startDate: [''],      
      endDate: [''],   
    });
    this.getProductList();
    this.getOwnerList();
  }

  getProductList() {
    this.httpClient.get(quarryApi+'/admin/getAllActiveProduct/'+this.quarryId).subscribe(data => {
      this.productList = data;
      console.log(this.productList);
    } ,error => {
      this.errorToast("Something went wrong.");       
    });  
  }

  getOwnerList() {
    this.httpClient.get(quarryApi+'/admin/getAllOwner/'+this.quarryId).subscribe(data => {
      this.ownerList = data;
      console.log(this.ownerList);
    } ,error => {
      this.errorToast("Something went wrong.");       
    }); 
  }

  onSubmit(filterValue: any) {
    this.filterValue = filterValue;
    this.isResponseEmpy = true;
    const postData = {
      productId: filterValue.productId,
      ownerId: filterValue.ownerId,
      paymentType: filterValue.paymentType,
      paymentStatus: filterValue.paymentStatus,
      quarryId: this.quarryId,
      startDate: filterValue.startDate == "" ? new Date().toISOString().slice(0, 10) : filterValue.startDate,
      endDate: filterValue.endDate == "" ? new Date().toISOString().slice(0, 10) : filterValue.endDate,
    };
    this.httpClient.post(quarryApi+'/admin/generateReport/'+this.quarryId, postData).subscribe(response => {
      this.filterList = response;
      console.log(this.filterList['length']);
      this.isResponseEmpy = this.filterList['length'] == 0 ? true : false;
    });
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

  onView(loadId: any) {
    this.router.navigate(['tabs/load-details'],{ queryParams: { loadId : loadId } }); 
  }

  downloadReport(filterValue: any) {
    const postData = {
      productId: filterValue.productId,
      ownerId: filterValue.ownerId,
      paymentType: filterValue.paymentType,
      paymentStatus: filterValue.paymentStatus,
      quarryId: this.quarryId,
      startDate: filterValue.startDate == "" ? new Date().toISOString().slice(0, 10) : filterValue.startDate,
      endDate: filterValue.endDate == "" ? new Date().toISOString().slice(0, 10) : filterValue.endDate,
    };
    this.httpClient.post(quarryApi+'/admin/generateExcel/'+this.quarryId, postData, {responseType:'arraybuffer'}).subscribe(response => {
      console.log(response);
      var blob = new Blob([response], {type: "application/vnd.ms-excel"});
      var objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    });  
  }

  async updatePaymentStatus(loadId: any) {
    const alert = await this.alertcontroller.create({
      header: 'Are you sure want to update the payment status to SUCCESS!!!',
      buttons: [
        {
          text: 'No',
          role: 'no',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.loadCtrl();
            this.httpClient.get(quarryApi+'/admin/editPaymentStatus/'+loadId).subscribe(response => {
              this.loadingCtrl.dismiss();
              console.log(response);
              this.msgToast("Payment Status Updated Successfully!!!");
              this.onSubmit(this.filterValue);
            },error => {
              this.loadingCtrl.dismiss();
              this.errorToast("Something went wrong");
            });  
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async loadCtrl() {
    const loading = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines'
    });
    await loading.present();
  }

  async msgToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
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

}
