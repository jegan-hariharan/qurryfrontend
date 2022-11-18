import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuarryPageRoutingModule } from './create-quarry-routing.module';

import { CreateQuarryPage } from './create-quarry.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuarryPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [CreateQuarryPage]
})
export class CreateQuarryPageModule {}
