import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  quarryName: any;
  quarryId: any;
  productEmpty = true;
  productList: any;
  productName: any;
  productId: any;
  isActive: any;
  constructor(public loadingCtrl: LoadingController, private httpClient: HttpClient, private router: Router, private activaterouter: ActivatedRoute, private alertcontroller: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    this.quarryName = localStorage.getItem('quarryName');
    this.activaterouter.queryParams.subscribe(param => {
      this.quarryId = param.quarryId,
      this.fetchProductsList();
    });
  }

  fetchProductsList() {
    this.loadCtrl();
    this.httpClient.get(quarryApi+'/admin/getAllProduct/'+this.quarryId).subscribe(response => {
      this.loadingCtrl.dismiss();
      console.log(response);
      this.productList = response;
      this.productEmpty = false;
    },error => {
      this.errorToast();
    }); 
  }

  async addProduct() {
    const alert = await this.alertcontroller.create({
      header: 'Add Product',
      message: "",
      inputs: [
        {
          placeholder: 'Product Name',
          value: '',
          name: 'productName'
        },
        {
          type: 'number',
          placeholder: 'Unit Cost',
          value: '',
          name: 'unitCost',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => { 
            if(data.productName == "") {
              alert.message = "*Product name is required";
              return false;
            }
            if(data.unitCost == "") {
              alert.message = "*unitCost is required";
              return false;
            }
            this.loadCtrl();
            this.httpClient.post(quarryApi+'/admin/addProduct/'+this.quarryId, data).subscribe(response => {
              this.loadingCtrl.dismiss();
              console.log(response);
              this.fetchProductsList();
              this.msgToast("Product Added Successfully!!!")
            },error => {
              this.errorToast();
            }); 
          }
        }
      ]
    });

    await alert.present();
  }

  async editProduct(index:any) {
    this.productName = this.productList[index]['productName'];
    this.productId = this.productList[index]['productId'];
    const alert = await this.alertcontroller.create({
      header: 'Update Product',
      message: "",
      inputs: [
        {
          placeholder: 'Product Name',
          value: this.productName,
          name: 'productName'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => { 
            if(data.productName == "") {
              alert.message = "*Product name is required";
              return false;
            }
            this.loadCtrl();
            this.httpClient.put(quarryApi+'/admin/editProduct/'+this.productId, data).subscribe(response => {
              this.loadingCtrl.dismiss();
              console.log(response);
              this.fetchProductsList();
              this.msgToast("Product Updated Successfully!!!")
            },error => {
              this.errorToast();
            }); 
          }
        }
      ]
    });

    await alert.present();
  }

  async editStatus(index:any) {
    this.isActive = this.productList[index]['isActive'];
    this.productId = this.productList[index]['productId'];
    const alert = await this.alertcontroller.create({
      header: 'Update Status',
      message: "",
      inputs: [
        {
          type: 'radio',
          value: 1,
          name: 'status',
          checked: this.isActive == true ? true : false,
          label: 'Active'
        },
        {
          type: 'radio',
          value: 0,
          name: 'status',
          checked: this.isActive == false ? true : false,
          label: 'In-Active'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => { 
            this.loadCtrl();
            this.httpClient.get(quarryApi+'/editProductStatus/'+this.productId+'/'+data).subscribe(response => {
              this.loadingCtrl.dismiss();
              console.log(response);
              this.fetchProductsList();
              this.msgToast("Product Updated Successfully!!!")
            },error => {
              this.errorToast();
            }); 
          }
        }
      ]
    });

    await alert.present();
  }

  onclickProduct(index: any) {
    this.router.navigate(['/tabs/unit-cost'],{ queryParams: { quarryId : this.quarryId, productId : this.productList[index]['productId'] } });  
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

  async errorToast() {
    const toast = await this.toastController.create({
      message: "Something went wrong",
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
