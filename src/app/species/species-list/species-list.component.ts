import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
  filteredList: Species[];
  moreInfoSub: Subscription;
  @ViewChildren('cardList') cardList: QueryList<SpeciesCardComponent>;
  @ViewChild('name', { static: false }) name;
  @ViewChild('fresh', { static: false }) fresh;
  @ViewChild('salt', { static: false }) salt;
  @ViewChild('size', { static: false }) size;
  @ViewChild('difficulty', { static: false }) difficulty;

  constructor(private speciesService: SpeciesService) {}

  ngOnInit() {
    this.speciesList = this.speciesService.getAllSpecies();
    this.moreInfoSub = this.speciesService.viewMoreInfo.subscribe((index) => {
      this.hideAllOtherCards(index);
    });
  }

  filter() {
    this.speciesList = this.speciesService.getAllSpecies();
    let saltChecked = this.salt.nativeElement.checked;
    let freshChecked = this.fresh.nativeElement.checked;
    let size = this.size.nativeElement.value;
    let name = this.name.nativeElement.value;
    let difficulty = this.difficulty.nativeElement.value;

    this.speciesList = this.speciesList.filter((species) =>
      this.byName(species, name.toLocaleLowerCase())
    );

    if (!freshChecked && !saltChecked) {
      this.speciesList = [];
    }

    if (!(freshChecked && saltChecked)) {
      if (this.fresh.nativeElement.checked) {
        this.speciesList = this.speciesList.filter((species) =>
          this.byFreshWater(species, 'freshwater')
        );
      }

      if (this.salt.nativeElement.checked) {
        this.speciesList = this.speciesList.filter((species) =>
          this.bySaltWater(species, 'saltwater')
        );
      }
    }

    if (size != '0') {
      this.speciesList = this.speciesList.filter((species) =>
        this.bySize(species, size)
      );
    }

    if (difficulty != '0') {
      this.speciesList = this.speciesList.filter((species) =>
        this.byDifficulty(species, parseInt(difficulty))
      );
    }

    // this.speciesList = this.speciesService.getAllSpecies();
    // switch (type) {
    //   case 'name':
    //     this.speciesList = this.speciesList.filter((species) =>
    //       this.byName(species, input.toLocaleLowerCase())
    //     );
    //     break;
    //   case 'freshwater':
    //     this.speciesList = this.speciesList.filter((species) =>
    //       this.byWater(species, input, 'freshwater')
    //     );
    //     break;
    //   case 'saltwater':
    //     this.speciesList = this.speciesList.filter((species) =>
    //       this.byWater(species, input, 'saltwater')
    //     );
    //     break;
    //   case 'size':
    //     console.log(input);
    //     break;
    //   case 'difficulty':
    //     console.log(input);
    //     break;
    // }
  }

  byDifficulty(species: Species, difficulty: number): unknown {
    let speciesDifficulty = species.difficulty;
    if (speciesDifficulty === difficulty) {
      return true;
    }
    return false;
  }

  bySize(species: Species, size: string) {
    let speciesSize = species.size;
    if (speciesSize < 5 && size === 'XS') {
      return true;
    } else if (speciesSize < 15 && speciesSize >= 5 && size === 'S') {
      return true;
    } else if (speciesSize < 50 && speciesSize >= 15 && size === 'M') {
      return true;
    } else if (speciesSize < 100 && speciesSize >= 50 && size === 'L') {
      return true;
    } else if (speciesSize >= 100 && size === 'XL') {
      return true;
    } else {
      return false;
    }
  }

  byFreshWater(species: Species, waterType: string) {
    if (species.waterType === waterType && this.fresh.nativeElement.checked) {
      return true;
    }
    return false;
  }

  bySaltWater(species: Species, waterType: string) {
    if (species.waterType === waterType && this.salt.nativeElement.checked) {
      return true;
    }
    return false;
  }

  byName(species: Species, input: string) {
    if (species.name.toLocaleLowerCase().search(input) != -1) {
      return true;
    }
    return false;
  }

  hideAllOtherCards(index) {
    this.cardList.forEach((element) => {
      if (element.objIndex !== index) {
        element.remove = 'remove';
      }
    });
  }
}
