import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideBarService } from '../shared/sidebar.service';

@Component({
  selector: 'app-my-tank-sidebar',
  templateUrl: './my-tank-sidebar.component.html',
  styleUrls: ['./my-tank-sidebar.component.less'],
})
export class MyTankSidebarComponent implements OnInit {
  myTankExpanded = false;
  myTankLabelTriggered = false;
  labelLowered = false;

  constructor(private sideBarService: SideBarService) {
    this.sideBarService.toggleSideBar.subscribe(() => {
      this.myTankExpanded = true;
    });

    this.sideBarService.closeSideBar.subscribe(() => {
      this.myTankExpanded = false;
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
