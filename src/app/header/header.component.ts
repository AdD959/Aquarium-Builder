import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  siteName = 'Aquarium Builder';
  optionsNavigationIsOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggleNav() {
    this.optionsNavigationIsOpen = !this.optionsNavigationIsOpen;
  }
}
