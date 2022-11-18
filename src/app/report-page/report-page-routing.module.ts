import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPagePage } from './report-page.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPagePageRoutingModule {}
