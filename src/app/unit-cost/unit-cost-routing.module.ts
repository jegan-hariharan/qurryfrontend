import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitCostPage } from './unit-cost.page';

const routes: Routes = [
  {
    path: '',
    component: UnitCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitCostPageRoutingModule {}
