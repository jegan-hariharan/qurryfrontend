import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadEntryPageRoutingModule } from './load-entry-routing.module';

import { LoadEntryPage } from './load-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadEntryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoadEntryPage],
  providers: [DatePipe]
})
export class LoadEntryPageModule {}
