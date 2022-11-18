import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'create-quarry',
    loadChildren: () => import('./create-quarry/create-quarry.module').then( m => m.CreateQuarryPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'unit-cost',
    loadChildren: () => import('./unit-cost/unit-cost.module').then( m => m.UnitCostPageModule)
  },
  {
    path: 'entry-pass',
    loadChildren: () => import('./entry-pass/entry-pass.module').then( m => m.EntryPassPageModule)
  },
  {
    path: 'add-vehicle',
    loadChildren: () => import('./add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'entry-status-update',
    loadChildren: () => import('./entry-status-update/entry-status-update.module').then( m => m.EntryStatusUpdatePageModule)
  },
  {
    path: 'load-entry-search',
    loadChildren: () => import('./load-entry-search/load-entry-search.module').then( m => m.LoadEntrySearchPageModule)
  },
  {
    path: 'load-entry',
    loadChildren: () => import('./load-entry/load-entry.module').then( m => m.LoadEntryPageModule)
  },
  {
    path: 'entry-out-search',
    loadChildren: () => import('./entry-out-search/entry-out-search.module').then( m => m.EntryOutSearchPageModule)
  },
  {
    path: 'entry-out-pass',
    loadChildren: () => import('./entry-out-pass/entry-out-pass.module').then( m => m.EntryOutPassPageModule)
  },
  {
    path: 'load-list',
    loadChildren: () => import('./load-list/load-list.module').then( m => m.LoadListPageModule)
  },
  {
    path: 'load-details',
    loadChildren: () => import('./load-details/load-details.module').then( m => m.LoadDetailsPageModule)
  },
  {
    path: 'quarry-details',
    loadChildren: () => import('./quarry-details/quarry-details.module').then( m => m.QuarryDetailsPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'challen-setup',
    loadChildren: () => import('./challen-setup/challen-setup.module').then( m => m.ChallenSetupPageModule)
  },
  {
    path: 'report-field',
    loadChildren: () => import('./report-field/report-field.module').then( m => m.ReportFieldPageModule)
  },
  {
    path: 'report-page',
    loadChildren: () => import('./report-page/report-page.module').then( m => m.ReportPagePageModule)
  },
  {
    path: 'add-vehicle-owner',
    loadChildren: () => import('./add-vehicle-owner/add-vehicle-owner.module').then( m => m.AddVehicleOwnerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
