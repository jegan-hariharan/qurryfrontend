import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadEntrySearchPageRoutingModule } from './load-entry-search-routing.module';

import { LoadEntrySearchPage } from './load-entry-search.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadEntrySearchPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [LoadEntrySearchPage]
})
export class LoadEntrySearchPageModule {}
