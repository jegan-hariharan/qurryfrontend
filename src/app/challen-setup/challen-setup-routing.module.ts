import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallenSetupPage } from './challen-setup.page';

const routes: Routes = [
  {
    path: '',
    component: ChallenSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallenSetupPageRoutingModule {}
