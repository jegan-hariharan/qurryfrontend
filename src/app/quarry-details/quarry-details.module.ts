import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuarryDetailsPageRoutingModule } from './quarry-details-routing.module';

import { QuarryDetailsPage } from './quarry-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuarryDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuarryDetailsPage],
  providers: [DatePipe]
})
export class QuarryDetailsPageModule {}
