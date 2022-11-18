import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVehicleOwnerPage } from './add-vehicle-owner.page';

const routes: Routes = [
  {
    path: '',
    component: AddVehicleOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVehicleOwnerPageRoutingModule {}
