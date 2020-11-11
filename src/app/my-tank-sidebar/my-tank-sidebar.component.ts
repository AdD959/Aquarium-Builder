import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../shared/sidebar.service';

@Component({
  selector: 'app-my-tank-sidebar',
  templateUrl: './my-tank-sidebar.component.html',
  styleUrls: ['./my-tank-sidebar.component.less'],
})
export class MyTankSidebarComponent implements OnInit {
  myTankExpanded = false;
  myTankLabelTriggered = false;


  constructor(private sideBarService: SideBarService) {
    this.sideBarService.toggleSideBar.subscribe(() => {
      this.myTankExpanded = true;
    });
  }

  ngOnInit() {}

  openMyTank() {
    this.myTankExpanded = true;
  }

  closeMyTank() {
    this.myTankExpanded = false;
  }
}
