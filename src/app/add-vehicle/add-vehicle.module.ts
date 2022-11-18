import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVehiclePageRoutingModule } from './add-vehicle-routing.module';

import { AddVehiclePage } from './add-vehicle.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVehiclePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AddVehiclePage]
})
export class AddVehiclePageModule {}
