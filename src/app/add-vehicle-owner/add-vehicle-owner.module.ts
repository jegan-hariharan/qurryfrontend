import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVehicleOwnerPageRoutingModule } from './add-vehicle-owner-routing.module';

import { AddVehicleOwnerPage } from './add-vehicle-owner.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVehicleOwnerPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AddVehicleOwnerPage]
})
export class AddVehicleOwnerPageModule {}
