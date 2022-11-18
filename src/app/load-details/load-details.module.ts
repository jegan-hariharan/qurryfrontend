import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadDetailsPageRoutingModule } from './load-details-routing.module';

import { LoadDetailsPage } from './load-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadDetailsPageRoutingModule
  ],
  declarations: [LoadDetailsPage]
})
export class LoadDetailsPageModule {}
