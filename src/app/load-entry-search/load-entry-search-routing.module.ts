import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadEntrySearchPage } from './load-entry-search.page';

const routes: Routes = [
  {
    path: '',
    component: LoadEntrySearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadEntrySearchPageRoutingModule {}
