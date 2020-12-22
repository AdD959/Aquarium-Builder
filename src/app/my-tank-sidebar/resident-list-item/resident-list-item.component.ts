import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MyTankService } from 'src/app/my-tank/my-tank.service';
import { Species } from 'src/app/species/species.model';
import { SpeciesService } from 'src/app/species/species.service';
import { ResidentListItem, State } from './resident-list-item.model';
import { TimelineMax } from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resident-list-item',
  templateUrl: './resident-list-item.component.html',
  styleUrls: ['./resident-list-item.component.less'],
})
export class ResidentListItemComponent implements OnInit, ResidentListItem {
  @Input() tankSize: number;
  @Input() largestFish: number;
  @Input() id: number;
  @Input() count: number;

  @Output() stateOverall = new EventEmitter<{id: number, status: State}>();
  @Output() removeFromTank = new EventEmitter<number>();

  constructor(
    private myTankService: MyTankService,
    private speciesService: SpeciesService
  ) {}

  name: string;
  space: number;
  community: number;
  img: string;
  stateCount: State;
  stateSpace: State;
  stateCommunity: State;
  species: Species;
  minGroupSize: number;
  size: number;
  requiredSpace: number;
  acceptedSpace: number;
  status: State;

  ngOnInit() {
    this.species = this.speciesService.getSpecies(this.id);
    this.img = this.species.heroImg;
    this.name = this.species.name;
    this.minGroupSize = this.species.minGroupSize;
    this.size = this.species.size;
    this.requiredSpace = this.size * 4;
    this.acceptedSpace = this.size * 3;
    this.tankSize = this.myTankService.getTankSize();
    this.assess();

    this.myTankService.tankAnyChange.subscribe(() => {
      this.assess();
    });
  }

  ngOnViewInit() {}

  delete() {
    this.myTankService.removeResident(this.id);
    this.removeSpeciesFromTank();
    this.myTankService.tankUpdated();
    // this.assess();
  }

  assess() {
    this.stateCount = this.checkCount();
    this.stateSpace = this.checkSpace();
    this.stateCommunity = this.checkCommunity();
    this.stateOverall.emit(this.returnAssessment());
  }

  checkCount() {
    if (this.count >= this.minGroupSize) {
      return State.Good;
    } else if (this.count >= this.minGroupSize - 2) {
      return State.Moderate;
    } else {
      return State.Bad;
    }
  }

  checkSpace() {
    this.tankSize = this.myTankService.getTankSize();

    if (this.tankSize >= this.requiredSpace) {
      return State.Good;
    } else if (this.tankSize >= this.acceptedSpace) {
      return State.Moderate;
    } else {
      return State.Bad;
    }
  }

  checkCommunity() {
    if (this.largestFish / this.size > 5) {
      return State.Bad;
    } else {
      return State.Good;
    }
  }

  returnAssessment() {
    let assessmentValue = 0;
    let states = [this.stateCount, this.stateSpace, this.stateCommunity];

    states.forEach((state) => {
      switch (state) {
        case State.Good:
          assessmentValue += 2;
          break;
        case State.Moderate:
          assessmentValue += 1;
          break;
        case State.Bad:
          assessmentValue -= 1;
          break;
      }
    });

    switch (true) {
      case assessmentValue === 6:
        return { id: this.id, status: State.Good };
      case assessmentValue > 3:
        return { id: this.id, status: State.Moderate };
      default:
        return { id: this.id, status: State.Bad };
    }
  }

  removeSpeciesFromTank() {
    this.removeFromTank.emit(this.id);
  }
}
