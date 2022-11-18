import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryOutPassPageRoutingModule } from './entry-out-pass-routing.module';

import { EntryOutPassPage } from './entry-out-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryOutPassPageRoutingModule
  ],
  declarations: [EntryOutPassPage],
  providers: [DatePipe]
})
export class EntryOutPassPageModule {}
