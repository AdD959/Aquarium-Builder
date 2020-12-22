import { Species } from 'src/app/species/species.model';

export class ResidentListItem {
  public id: number;
  public name: string;
  public count: number;
  public space: number;
  public community: number;
  public img: string;
  public stateCount: State;
  public stateSpace: State;
  public species: Species;

  constructor() {}

}


export enum State {
  Good = 'good',
  Moderate = 'moderate',
  Bad = 'bad'
}
