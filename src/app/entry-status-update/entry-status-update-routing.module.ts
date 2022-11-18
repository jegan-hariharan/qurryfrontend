import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryStatusUpdatePage } from './entry-status-update.page';

const routes: Routes = [
  {
    path: '',
    component: EntryStatusUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryStatusUpdatePageRoutingModule {}
