import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SideBarService } from '../shared/sidebar.service';
import { TimelineMax } from 'gsap';
import { MyTankService } from '../my-tank/my-tank.service';
import { fromEvent, Subscription } from 'rxjs';
import { SpeciesService } from '../species/species.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-my-tank-sidebar',
  templateUrl: './my-tank-sidebar.component.html',
  styleUrls: ['./my-tank-sidebar.component.less'],
})
export class MyTankSidebarComponent implements OnInit {
  myTankExpanded = true;
  myTankLabelTriggered = false;
  labelLowered = false;
  selectedTank = 'M';
  watchTank = new Subscription();
  tlmToTop = new TimelineMax();
  tlmToMid = new TimelineMax();
  tlmToBot = new TimelineMax();
  residents = [];
  residentsFiltered = [];
  tankSize = 1;
  smallTankLimit = 100;
  mediumTankLimit = 400;
  largeTankLimit = 1000;
  source: any;

  @ViewChild('smallIcon', { static: false }) smallIcon;
  @ViewChild('mediumIcon', { static: false }) mediumIcon;
  @ViewChild('largeIcon', { static: false }) largeIcon;
  @ViewChild('gallons', { static: false }) gallons;

  constructor(
    private sideBarService: SideBarService,
    private myTankService: MyTankService,
    private speciesService: SpeciesService
  ) {
    this.residents = this.myTankService.getMySpeciesArray();
    this.filterDuplicates();
    this.getLargestFish();

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

  ngAfterViewInit(): void {
    this.source = fromEvent(this.gallons.nativeElement, 'keyup');
    this.source.pipe(debounceTime(600)).subscribe(c =>
    {
      this.assessSize();
    }
    );
  }

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

  assessSize() {
    let newSize = this.gallons.nativeElement.value;
    this.myTankService.setTankSize(newSize);
    this.setNewTankSize(newSize);
    if (newSize < this.smallTankLimit) {
      if (this.tankSize === 1) {
        this.selectTank('small');
        this.tankSize = 1;
      }
    } else if (newSize < this.mediumTankLimit) {
      if (this.tankSize === 2) {
        this.selectTank('medium');
        this.tankSize = 2;
      }
    } else {
      if (this.tankSize === 3) {
        this.selectTank('large');
        this.tankSize = 3;
      }
    }
  }

  setNewTankSize(newSize: number) {
    if (newSize < this.smallTankLimit) {
      this.tankSize = 1;
    } else if (newSize < this.mediumTankLimit) {
      this.tankSize = 2;
    } else {
      this.tankSize = 3;
    }
  }

  getLargestFish() {
    const largestFish: number[] = [];
    this.residents.forEach((el) => {
      const species = this.speciesService.getSpecies(el);
      const speciesSize = species.size;
      largestFish.push(speciesSize);
    });
    return Math.max(...largestFish);
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

  selectTank(size: string, forceCheck = false) {
    const currentGallons = this.gallons.nativeElement.value;
    switch (size) {
      case 'small':
        this.selectedTank = 'S';
        this.selectSmall();
        if (currentGallons > this.smallTankLimit && forceCheck) {
          this.gallons.nativeElement.value = this.smallTankLimit;
          this.myTankService.setTankSize(this.smallTankLimit);
        }
        break;
      case 'medium':
        this.selectedTank = 'M';
        this.selectMed();
        console.log('CG: ' + currentGallons + ' this.smallTankLimit: ' + this.smallTankLimit);
        if ((currentGallons <= this.smallTankLimit || currentGallons >= this.mediumTankLimit) && forceCheck) {
          this.gallons.nativeElement.value = this.mediumTankLimit;
          this.myTankService.setTankSize(this.mediumTankLimit);
        }
        break;
      case 'large':
        this.selectedTank = 'L';
        this.selectLarge();
        if (currentGallons <= this.mediumTankLimit && forceCheck) {
          this.gallons.nativeElement.value = this.largeTankLimit;
          this.myTankService.setTankSize(this.largeTankLimit);
        }
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
