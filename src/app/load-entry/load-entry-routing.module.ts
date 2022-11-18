import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadEntryPage } from './load-entry.page';

const routes: Routes = [
  {
    path: '',
    component: LoadEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadEntryPageRoutingModule {}
