import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryOutSearchPageRoutingModule } from './entry-out-search-routing.module';

import { EntryOutSearchPage } from './entry-out-search.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryOutSearchPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [EntryOutSearchPage]
})
export class EntryOutSearchPageModule {}
