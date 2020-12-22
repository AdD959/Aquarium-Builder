import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SideBarService } from '../shared/sidebar.service';
import { TimelineMax } from 'gsap';
import { MyTankService } from '../my-tank/my-tank.service';
import { fromEvent, Subscription } from 'rxjs';
import { SpeciesService } from '../species/species.service';
import { debounceTime } from 'rxjs/operators';
import { State } from './resident-list-item/resident-list-item.model';
import { state } from '@angular/animations';

@Component({
  selector: 'app-my-tank-sidebar',
  templateUrl: './my-tank-sidebar.component.html',
  styleUrls: ['./my-tank-sidebar.component.less'],
})
export class MyTankSidebarComponent implements OnInit, AfterViewInit {
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
  tankSizeGroup = 1;
  smallTankLimit = 100;
  mediumTankLimit = 400;
  largeTankLimit = 1000;
  source: any;
  tankSize: number;
  residentStatusList = [];
  unhappyResidentsCount = 0;

  @ViewChild('smallIcon', { static: false }) smallIcon;
  @ViewChild('mediumIcon', { static: false }) mediumIcon;
  @ViewChild('largeIcon', { static: false }) largeIcon;
  @ViewChild('gallons', { static: false }) gallons;
  @ViewChild('svgRating', { static: false }) svgRating;
  @ViewChild('ratingB', { static: false }) ratingB;
  @ViewChild('ratingA', { static: false }) ratingA;
  @ViewChild('radialGrad', { static: false }) radialGrad;
  @ViewChild('radiusColor', { static: false }) radiusColor;
  @ViewChild('ribbons', { static: false }) ribbons;

  constructor(
    private sideBarService: SideBarService,
    private myTankService: MyTankService,
    private speciesService: SpeciesService,
    private elem: ElementRef
  ) {}

  ngOnInit() {
    this.residents = this.myTankService.getMySpeciesArray();
    this.tankSize = this.myTankService.getTankSize();
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

  ngAfterViewInit(): void {
    this.source = fromEvent(this.gallons.nativeElement, 'keyup');
    this.source.pipe(debounceTime(600)).subscribe(() => {
      this.assessSize();
    });
  }

  setRatingOpacity() {
    if (this.ratingA != undefined && this.ratingB != undefined) {
      switch (this.myTankService.getRating()) {
        case 1:
          this.svgRating.nativeElement.classList.add('visible');
          this.radialGrad.nativeElement.classList.remove('gradeB');
          this.radiusColor.nativeElement.classList.remove('gradeB');
          this.ribbons.nativeElement.classList.remove('gradeB');
          this.ratingA.nativeElement.style.opacity = 1;
          this.ratingB.nativeElement.style.opacity = 0;
          break;
        case 2:
          this.svgRating.nativeElement.classList.add('visible');
          this.radialGrad.nativeElement.classList.add('gradeB');
          this.radiusColor.nativeElement.classList.add('gradeB');
          this.ribbons.nativeElement.classList.add('gradeB');
          this.ratingA.nativeElement.style.opacity = 0;
          this.ratingB.nativeElement.style.opacity = 1;
          break;
        case 3:
          this.svgRating.nativeElement.classList.remove('visible');
          this.ratingA.nativeElement.style.opacity = 0;
          this.ratingB.nativeElement.style.opacity = 0;
          break;
      }
    }
  }

  setRating() {
    var total = this.residentStatusList.length;
    var ratingsGood = [];
    var ratingsModerate = [];
    var ratingsBad = [];
    for (var i = 0; i < total; i++) {
      switch (this.residentStatusList[i].status) {
        case State.Good:
          ratingsGood.push(State.Good);
          break;
        case State.Moderate:
          ratingsModerate.push(State.Moderate);
          break;
        case State.Bad:
          ratingsBad.push(State.Bad);
          break;
      }
    }

    if (ratingsGood.length === total) {
      this.myTankService.setRating(1);
    } else if (ratingsBad.length > 0) {
      this.myTankService.setRating(3);
    } else {
      this.myTankService.setRating(2);
    }

    this.setRatingOpacity();
  }

  removeDeletedSpecies(id: number) {
    var pos = this.residentStatusList
      .map((e) => {
        return e.id;
      })
      .indexOf(id);

    this.residentStatusList.splice(pos, 1);
    this.setRating();
  }

  assessTank(species: { id: number; status: State }) {
    //searchList for this species
    if (this.residentStatusList.length > 0) {
      //loop through the list if its got more than 1 item
      var found = false;
      for (var i = 0; i < this.residentStatusList.length; i++) {
        //check if current species is already in list, if so update
        if (this.residentStatusList[i].id === species.id) {
          this.residentStatusList[i].status = species.status;
          found = true;
        }
      }

      if (found === false) {
        this.residentStatusList.push(species);
      }
      // Add the first species to the list if the list is empty
    } else {
      this.residentStatusList.push(species);
    }

    this.setRating();
    this.setRatingOpacity();
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
      if (this.tankSizeGroup === 1) {
        this.selectTank('small');
        this.tankSizeGroup = 1;
      }
    } else if (newSize < this.mediumTankLimit) {
      if (this.tankSizeGroup === 2) {
        this.selectTank('medium');
        this.tankSizeGroup = 2;
      }
    } else {
      if (this.tankSizeGroup === 3) {
        this.selectTank('large');
        this.tankSizeGroup = 3;
      }
    }
  }

  setNewTankSize(newSize: number) {
    if (newSize < this.smallTankLimit) {
      this.tankSizeGroup = 1;
    } else if (newSize < this.mediumTankLimit) {
      this.tankSizeGroup = 2;
    } else {
      this.tankSizeGroup = 3;
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

        if (
          (currentGallons <= this.smallTankLimit ||
            currentGallons >= this.mediumTankLimit) &&
          forceCheck
        ) {
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
