import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryStatusUpdatePageRoutingModule } from './entry-status-update-routing.module';

import { EntryStatusUpdatePage } from './entry-status-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryStatusUpdatePageRoutingModule
  ],
  declarations: [EntryStatusUpdatePage],
  providers:[DatePipe]
})
export class EntryStatusUpdatePageModule {}
