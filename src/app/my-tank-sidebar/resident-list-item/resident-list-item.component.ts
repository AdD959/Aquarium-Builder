import { Component, Input, OnInit } from '@angular/core';
import { Species } from 'src/app/species/species.model';
import { SpeciesService } from 'src/app/species/species.service';
import { ResidentListItem } from './resident-list-item.model';

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

  @Input() id: number;
  @Input() count: number;

  constructor(
    private speciesService: SpeciesService
  ) { }

  ngOnInit() {
    this.species = this.speciesService.getSpecies(this.id);
    this.img = this.species.heroImg;
    this.name = this.species.name;
  }

  ngOnViewInit() {

  }
}
