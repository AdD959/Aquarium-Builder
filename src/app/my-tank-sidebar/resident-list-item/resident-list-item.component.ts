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
import { ResidentListItem } from './resident-list-item.model';
import { TimelineMax } from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resident-list-item',
  templateUrl: './resident-list-item.component.html',
  styleUrls: ['./resident-list-item.component.less'],
})
export class ResidentListItemComponent implements OnInit, ResidentListItem {
  name: string;
  space: number;
  community: number;
  species: Species;
  img: string;
  minGroupSize: number;
  size: number;
  requiredSpace: number;
  requiredSpaceResult: string;
  completelySatisfied = false;
  perfectCount: boolean;
  perfectSpace: boolean;
  perfectCommunity: boolean;
  getCountStatusVar = '';
  assessCommunityVar: string;

  @Input() tankSize: number;
  @Input() largestFish: number;
  @Input() id: number;
  @Input() count: number;
  @Output() satisfied = new EventEmitter<number>();
  @Output() unsatisfied = new EventEmitter<number>();

  @ViewChild('removeBtn', { static: false }) removeBtn;

  constructor(
    private speciesService: SpeciesService,
    private myTankService: MyTankService
  ) {}

  ngOnInit() {
    this.species = this.speciesService.getSpecies(this.id);
    this.img = this.species.heroImg;
    this.name = this.species.name;
    this.minGroupSize = this.species.minGroupSize;
    this.size = this.species.size;
    this.requiredSpace = this.size * 4;

    this.myTankService.tankSizeChange.subscribe((newSize) => {
      this.checkSize(newSize);
    });

    this.getCountStatus();
    this.assessCommunity();
    this.checkSize();
  }

  ngOnViewInit() {}

  checkSize(newSize?: number) {
    if (newSize) {
      this.tankSize = newSize;
    }
    if (this.tankSize >= this.requiredSpace) {
      this.requiredSpaceResult = 'good';
      this.perfectSpace = true;
    } else if (this.tankSize < this.requiredSpace) {
      this.requiredSpaceResult = 'bad';
      this.perfectSpace = false;
    }
    this.checkSatisfaction();
  }

  checkSatisfaction() {
    if ( this.perfectCount && this.perfectSpace && this.perfectCommunity) {
      this.satisfied.emit(this.id);
    } else {
      this.unsatisfied.emit(this.id);
    }
  }

  assessCommunity() {
    if (this.largestFish / this.size > 5) {
      this.perfectCommunity = false;
      this.assessCommunityVar = 'bad';
    } else {
      this.perfectCommunity = true;
      this.assessCommunityVar = 'good';
    }
    this.checkSatisfaction();
  }

  delete() {
    this.myTankService.removeResident(this.id);
    this.checkSatisfaction();
  }

  getCountStatus() {
    if (this.count >= this.minGroupSize) {
      this.perfectCount = true;
      this.getCountStatusVar = 'good';
    } else if (this.count >= this.minGroupSize - 2) {
      this.getCountStatusVar = 'meh';
    } else {
      this.perfectCount = false;
      this.getCountStatusVar = 'bad';
    }
    this.checkSatisfaction();
  }
}
