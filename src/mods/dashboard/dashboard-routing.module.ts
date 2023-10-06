import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomePanelComponent} from "./panels/dashboard-home-panel/dashboard-home-panel.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardHomePanelComponent,
    loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
