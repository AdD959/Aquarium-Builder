import { Species } from './species.model';

export class SpeciesService {
  private species: Species[] = [
    { id: 0, name: 'fish1', type: 'fish', lifeSpan: 2, difficulty: 5, size: 'large', description: 'This is a description', heroImg: '' },
    { id: 1, name: 'fish2', type: 'fish', lifeSpan: 5, difficulty: 2, size: 'small', description: 'This is a description', heroImg: '' },
    { id: 2, name: 'fish3', type: 'fish', lifeSpan: 1, difficulty: 2, size: 'medium', description: 'This is a description', heroImg: '' },
    { id: 3, name: 'fish4', type: 'fish', lifeSpan: 11, difficulty: 3, size: 'large', description: 'This is a description', heroImg: '' }
  ];

  getAllSpecies() {
    return this.species.slice();
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
