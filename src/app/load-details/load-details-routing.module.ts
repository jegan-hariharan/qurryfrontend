import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadDetailsPage } from './load-details.page';

const routes: Routes = [
  {
    path: '',
    component: LoadDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadDetailsPageRoutingModule {}
