import { Injectable } from '@angular/core';
import { Species } from './species.model';

@Injectable()
export class SpeciesService {
  private species: Species[] = [
    {
      id: 0,
      name: 'Beta',
      type: 'fish',
      lifeSpan: 2,
      difficulty: 5,
      size: 'small',
      description: 'A member of the gourami family, these fish are highly territorial.',
      heroImg:
        '/../../assets/images/beta.svg',
    },
    {
      id: 1,
      name: 'Goldfish',
      type: 'fish',
      lifeSpan: 5,
      difficulty: 2,
      size: 'small',
      description: 'Your favourite bog-standard fish.',
      heroImg:
        '/../../assets/images/goldfish.svg',
    },
    {
      id: 2,
      name: 'Gourami',
      type: 'fish',
      lifeSpan: 1,
      difficulty: 2,
      size: 'medium',
      description: 'Has nice stripes.',
      heroImg:
        '/../../assets/images/gourami.svg',
    },
    {
      id: 3,
      name: 'Neon Tetra',
      type: 'fish',
      lifeSpan: 11,
      difficulty: 3,
      size: 'small',
      description: 'Very small fish that only thrives when in shoals. It\'s scales brightness indicates its health.',
      heroImg:
        '/../../assets/images/neon-tetra.svg',
    },
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
