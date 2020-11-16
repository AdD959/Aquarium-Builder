import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MyTankService } from 'src/app/my-tank/my-tank.service';
import { Species } from 'src/app/species/species.model';
import { SpeciesService } from 'src/app/species/species.service';
import { ResidentListItem } from './resident-list-item.model';
import { TimelineMax } from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resident-list-item',
  templateUrl: './resident-list-item.component.html',
  styleUrls: ['./resident-list-item.component.less']
})
export class ResidentListItemComponent implements OnInit, ResidentListItem {
  public name: string;
  public space: number;
  public community: number;
  public species: Species;
  public img: string;
  public minGroupSize: number;
  public size: number;
  public wontGetEaten = true;
  public requiredSpace: number;
  public requiredSpaceResult: string;
  public tankSize: number;

  @Input() largestFish: number;
  @Input() id: number;
  @Input() count: number;


  @ViewChild('removeBtn', { static: false }) removeBtn;

  constructor(
    private speciesService: SpeciesService,
    private myTankService: MyTankService
  ) { }

  ngOnInit() {
    this.species = this.speciesService.getSpecies(this.id);
    this.img = this.species.heroImg;
    this.name = this.species.name;
    this.minGroupSize = this.species.minGroupSize;
    this.size = this.species.size;
    this.requiredSpace = this.size * 4;
    this.tankSize = 100;
    this.myTankService.tankSizeChange.subscribe((newSize) => {
      this.tankSize = newSize;
      if (this.tankSize > this.requiredSpace) {
        this.requiredSpaceResult = 'good';
      } else if (this.tankSize < this.requiredSpace) {
        this.requiredSpaceResult = 'bad';
      }
    });
    if (this.tankSize > this.requiredSpace) {
      this.requiredSpaceResult = 'good';
    } else if (this.tankSize < this.requiredSpace) {
      this.requiredSpaceResult = 'bad';
    }
  }

  ngOnViewInit() {
    const removeBtnEl = this.removeBtn.nativeELement;
  }

  assessCommunity() {
    if (this.largestFish / this.size > 5) {
      this.wontGetEaten = true;
    } else {
      this.wontGetEaten = false;
    }
    return this.wontGetEaten;
  }

  delete() {
    this.myTankService.removeResident(this.id);
  }

  getCountStatus() {
    if (this.count >= this.minGroupSize) {
      return 'good';
    }

    if (this.count >= this.minGroupSize - 2) {
      return 'meh';
    }
    return 'bad';
  }
}
