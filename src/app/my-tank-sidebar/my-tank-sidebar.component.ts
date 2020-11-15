import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SideBarService } from '../shared/sidebar.service';
import { TimelineMax } from 'gsap';
import { MyTankService } from '../my-tank/my-tank.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-tank-sidebar',
  templateUrl: './my-tank-sidebar.component.html',
  styleUrls: ['./my-tank-sidebar.component.less'],
})
export class MyTankSidebarComponent implements OnInit {
  myTankExpanded = false;
  myTankLabelTriggered = false;
  labelLowered = false;
  selectedTank = 'M';
  watchTank = new Subscription();
  tlmToTop = new TimelineMax();
  tlmToMid = new TimelineMax();
  tlmToBot = new TimelineMax();
  residents = [];
  residentsFiltered = [];

  @ViewChild('smallIcon', { static: false }) smallIcon;
  @ViewChild('mediumIcon', { static: false }) mediumIcon;
  @ViewChild('largeIcon', { static: false }) largeIcon;

  constructor(
    private sideBarService: SideBarService,
    private myTankService: MyTankService
  ) {
    this.residents = this.myTankService.getMySpeciesArray();
    this.filterDuplicates();

    this.sideBarService.toggleSideBar.subscribe(() => {
      this.myTankExpanded = true;
    });

    this.sideBarService.closeSideBar.subscribe(() => {
      this.myTankExpanded = false;
    });

    this.myTankService.watchTank.subscribe((items) => {
      this.updateList(items);
    });
  }

  ngOnInit() {}

  filterDuplicates() {
    const counts = new Array();
    this.residentsFiltered = new Array();
    this.residents.sort();

    this.residents.forEach((resident) => {
      // have we seen this resident before
      if (counts.includes(resident)) {
        // if so add a count to its list
        const found = this.residentsFiltered
          .map((e) => {
            return e.id;
          })
          .indexOf(resident);
        this.residentsFiltered[found].count++;
      } else {
        // if not add the new resident to the list
        this.residentsFiltered.push({ id: resident, count: 1 });
        counts.push(resident);
      }
    });
  }

  openMyTank() {
    this.myTankExpanded = true;
  }

  closeMyTank() {
    this.myTankExpanded = false;
  }

  updateList(items) {
    this.residents = items;
    this.filterDuplicates();
  }

  selectTank(img: any) {
    switch (img.id) {
      case 'small':
        this.selectedTank = 'S';
        this.selectSmall();
        break;
      case 'medium':
        this.selectedTank = 'M';
        this.selectMed();
        break;
      case 'large':
        this.selectedTank = 'L';
        this.selectLarge();
        break;
    }
  }

  selectSmall() {
    this.tlmToTop.to('#innerGroup', 1.5, {
      y: 440,
      ease: 'elastic.inOut(0.5, 0.8)',
    });
  }

  selectMed() {
    this.tlmToTop.to('#innerGroup', 1.5, {
      y: 0,
      ease: 'elastic.inOut(0.5, 0.8)',
    });
  }

  selectLarge() {
    this.tlmToTop.to('#innerGroup', 1.5, {
      y: -440,
      ease: 'elastic.inOut(0.5, 0.8)',
    });
  }
}
