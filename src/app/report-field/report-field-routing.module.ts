import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportFieldPage } from './report-field.page';

const routes: Routes = [
  {
    path: '',
    component: ReportFieldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportFieldPageRoutingModule {}
