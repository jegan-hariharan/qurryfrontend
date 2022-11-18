import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadListPage } from './load-list.page';

const routes: Routes = [
  {
    path: '',
    component: LoadListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadListPageRoutingModule {}
