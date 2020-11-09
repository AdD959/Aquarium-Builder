import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { Species } from '../species.model';
import { SpeciesService } from '../species.service';
import { SpeciesCardComponent } from './species-card/species-card.component';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.less'],
})
export class SpeciesListComponent implements OnInit {
  speciesList: Species[];
  moreInfoSub: Subscription;
  @ViewChildren('cardList') cardList: QueryList<SpeciesCardComponent>;

  constructor(private speciesService: SpeciesService) {}

  ngOnInit() {
    this.speciesList = this.speciesService.getAllSpecies();
    this.moreInfoSub = this.speciesService.viewMoreInfo.subscribe(
      (index) => {
        this.hideAllOtherCards(index);
      }
    );
  }

  hideAllOtherCards(index) {
    this.cardList.forEach((element) => {
      if (element.objIndex !== index) {
        element.remove = 'remove';
      }
    });
  }
}
