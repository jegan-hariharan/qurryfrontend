import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordPage } from './change-password.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule],
})
export class ChangePasswordPageRoutingModule {}
