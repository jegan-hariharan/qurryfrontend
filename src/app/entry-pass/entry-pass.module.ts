import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryPassPageRoutingModule } from './entry-pass-routing.module';

import { EntryPassPage } from './entry-pass.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryPassPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [EntryPassPage]
})
export class EntryPassPageModule {}
