import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-load-entry',
  templateUrl: './load-entry.page.html',
  styleUrls: ['./load-entry.page.scss'],
})
export class LoadEntryPage implements OnInit {
  loadEntryForm: FormGroup;
  quarryId : any = "";
  quarryName : any = "";
  loadId: any;
  loadInfo: any;
  exitInfo: any;
  loadStatus: string;
  entryStatus: string;
  loadedInfo: any;
  unitCost: any;
  totalUnit: any;
  totalAmount: any;
  productList: any;
  productId: any;
  challanType: any;
  challanEnable: boolean = false;
  challanCost: Object;
  totalChallan: any;
  totalChallanAmount: number = 0;
  totalLoadAmount: number = 0;
  paymentStatus: boolean;
  paymentType: boolean;
  challanInfo: Object;
  constructor(private fb: FormBuilder, private datepipe: DatePipe,private toastController: ToastController,private activaterouter: ActivatedRoute ,private router: Router, private httpClient: HttpClient, private alertcontroller: AlertController) { 
  }

  ngOnInit() {
    this.quarryName = localStorage.getItem('quarryName');
    this.quarryId = localStorage.getItem('quarryId');
    this.activaterouter.queryParams.subscribe(param => {
      console.log(param);
      this.loadId = param.loadId,
      this.loadDetails();
      this.getProductList();
      this.getChallanCost();
    });
    this.loadEntryForm = this.fb.group({
      productId: ['', Validators.required],
      loadUnit: ['', [Validators.required]],
      totalLoadAmount: ['',[Validators.required]],
      isChallan: ['', [Validators.required]],
      paymentType: ['', [Validators.required,]],
      totalAmt: ['', [Validators.required]],
      
    });
    console.log(this.loadId);
  }

  getProductList() {
    this.httpClient.get(quarryApi+'/admin/getAllActiveProduct/'+this.quarryId).subscribe(data => {
      this.productList = data;
      console.log(this.productList);
      if(!this.productList.length) {
        this.errorToast("Product not uet configured.");   
      }
    } ,error => {
      this.errorToast("Something went wrong.");       
    });  
  }

  onChangeProduct(event) {
    this.productId = event.target.value;
    this.httpClient.get(quarryApi+'/calcualteLoadAmt/'+this.quarryId+'/'+this.productId).subscribe(data => {
      this.unitCost = data;
      console.log(this.unitCost);
      this.costAlert();
    } ,error => {
      this.errorToast("Something went wrong.");       
    });
  }

  getChallanCost() {
    this.httpClient.get(quarryApi+'/admin/getChallanUpdatedCost/'+this.quarryId).subscribe(data => {
      this.challanInfo = data;
      console.log(this.challanInfo['challanCost']);
    } ,error => {
      this.errorToast("Something went wrong.");       
    });  
  }

  onChangeChallan(event) {
    this.challanType = event.target.value;
    if(this.challanType==1) {
      this.challanEnable = true;
    } else {
      this.challanEnable = false;
    }
    
  }

  onChangeUnits(event) {
    this.totalUnit = event.target.value;
    this.totalLoadAmount = this.totalUnit*this.unitCost.unitCost;
    this.totalAmount = this.totalLoadAmount+this.totalChallanAmount;
  }

  onChangeChallanQuantity(event) {
    this.totalChallan = event.target.value;
    this.totalChallanAmount = this.totalChallan*this.challanInfo['challanCost'];
    this.totalAmount = this.totalLoadAmount+this.totalChallanAmount
  }

  onChangePaymentType(event) {
    this.paymentType = event.target.value == 0 ? false : true;
    this.paymentStatus = this.paymentType == false ? false : true;
  }

  loadDetails(){
    this.httpClient.get(quarryApi+'/loadDetails/'+this.loadId).subscribe(data => {
      this.loadInfo = data;
      this.loadStatus = this.loadInfo.loadStatus == false ? 'Unloaded' : 'Loaded';
      this.entryStatus = this.loadInfo.entryStatus == false ? 'IN' : 'Out';
      console.log(this.loadInfo);
    } ,error => {
      this.errorToast("Something went wrong.");       
    });
  }

  onSubmit(loadDetails: any) {
    if (this.loadEntryForm.valid) {
        const postData = {
          productId: loadDetails.productId,
          productUnitCost: this.unitCost.unitCost,
          challanUnitCost: this.challanInfo['challanCost'],
          loadUnit: this.totalUnit,
          loadAmt: this.totalLoadAmount,
          isChallan: this.challanEnable,
          totalChallan: this.totalChallan,
          totalChallanAmt: this.totalChallanAmount,
          paymentType: this.paymentType,
          paymentStatus: this.paymentStatus,
          totalAmt: this.totalAmount,
          loadStatus: true,
        };
        this.httpClient.put(quarryApi+'/updateLoadDetail/'+this.loadInfo.loadId, postData).subscribe(data => {
          this.loadedInfo = data;
          this.presentAlert();
          } ,error => {
            this.errorToast("Something went wrong.");      
        }); 
      
    } 
  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Truck Loaded with #'+this.loadedInfo.loadUnit+' unit successfully!',
      subHeader: "Truck loaded at: "+this.datepipe.transform(this.loadedInfo.loadDate, 'dd-MM-yyyy hh:mm a'),
      buttons: [
        {
          text: '',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            return false;
          }
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.loadDetails();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async costAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Today load Cost/Unit  is . '+this.unitCost.unitCost+'.',
      buttons: [
        {
          text: '',
          role: 'cancel',
          handler: data => {
            return false;
          }
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.loadDetails();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
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
}
