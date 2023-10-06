import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomePanelComponent} from "./panels/dashboard-home-panel/dashboard-home-panel.component";

const childRoutes: Routes = [
  {path: '', component: DashboardHomePanelComponent},
  {path: 'home', component: DashboardHomePanelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {
}
