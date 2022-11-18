import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChallenSetupPageRoutingModule } from './challen-setup-routing.module';

import { ChallenSetupPage } from './challen-setup.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallenSetupPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [ChallenSetupPage]
})
export class ChallenSetupPageModule {}
