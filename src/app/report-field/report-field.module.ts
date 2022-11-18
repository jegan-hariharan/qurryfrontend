import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportFieldPageRoutingModule } from './report-field-routing.module';

import { ReportFieldPage } from './report-field.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportFieldPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportFieldPage]
})
export class ReportFieldPageModule {}
