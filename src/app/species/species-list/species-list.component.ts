import { Component, OnInit } from '@angular/core';
import { Species } from '../species.model';
import { SpeciesService } from '../species.service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.less']
})
export class SpeciesListComponent implements OnInit {
  speciesList: Species[];

  constructor(
    private speciesService: SpeciesService
  ) { }

  ngOnInit() {
    this.speciesList = this.speciesService.getAllSpecies();
  }
}
