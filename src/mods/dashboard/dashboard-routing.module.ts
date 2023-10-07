import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPanelComponent} from "./panels/dashboard-panel/dashboard-panel.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPanelComponent,
    loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
