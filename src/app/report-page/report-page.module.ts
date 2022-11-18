import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPagePageRoutingModule } from './report-page-routing.module';

import { ReportPagePage } from './report-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPagePageRoutingModule
  ],
  declarations: [ReportPagePage]
})
export class ReportPagePageModule {}
