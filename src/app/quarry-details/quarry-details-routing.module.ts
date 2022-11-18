import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuarryDetailsPage } from './quarry-details.page';

const routes: Routes = [
  {
    path: '',
    component: QuarryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuarryDetailsPageRoutingModule {}
