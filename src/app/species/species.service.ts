import { Injectable } from '@angular/core';
import { Species } from './species.model';
import speciesListJson from '../../assets/json/species-list.json';

@Injectable()
export class SpeciesService {
  private species: Species[] = speciesListJson;

  getAllSpecies() {
    return this.species.slice(0, 12);
  }

  setSpecies(species: Species[]) {
    this.species = species;
  }

  addSpecies(newSpecies: Species) {
    this.species.push(newSpecies);
  }

  getSpecies(index: number) {
    return this.species[index];
  }

  updateSpecies(index: number, editedSpecies: Species) {
    this.species[index] = editedSpecies;
  }

  deleteSpecies(index: number) {
    this.species.splice(index, 1);
  }
}
