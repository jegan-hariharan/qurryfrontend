import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryPassPage } from './entry-pass.page';

const routes: Routes = [
  {
    path: '',
    component: EntryPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryPassPageRoutingModule {}
