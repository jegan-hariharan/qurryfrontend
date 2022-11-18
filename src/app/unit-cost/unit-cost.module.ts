import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitCostPageRoutingModule } from './unit-cost-routing.module';

import { UnitCostPage } from './unit-cost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UnitCostPageRoutingModule
  ],
  declarations: [UnitCostPage]
})
export class UnitCostPageModule {}
