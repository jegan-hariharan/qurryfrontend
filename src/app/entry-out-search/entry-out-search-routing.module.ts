import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryOutSearchPage } from './entry-out-search.page';

const routes: Routes = [
  {
    path: '',
    component: EntryOutSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryOutSearchPageRoutingModule {}
