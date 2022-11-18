import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadListPageRoutingModule } from './load-list-routing.module';

import { LoadListPage } from './load-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadListPageRoutingModule
  ],
  declarations: [LoadListPage]
})
export class LoadListPageModule {}
