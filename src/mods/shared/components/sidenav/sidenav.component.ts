import {Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  // :::
  //

  // ::: vars
  //
  mobileQuery: MediaQueryList;

  menuNav = [
    {name: 'Home', route: 'home', icon: 'home'},
    {name: 'Categorías', route: 'category', icon: 'category'},
    {name: 'Productos', route: 'product', icon: 'production_quantity_limits'},
  ]

  // ::: constructor
  //
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  // ::: init
  //

  // ::: ng
  //

  // ::: ui
  //

  // ::: methods
  //


}
