import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQuarryPage } from './create-quarry.page';

const routes: Routes = [
  {
    path: '',
    component: CreateQuarryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuarryPageRoutingModule {}
