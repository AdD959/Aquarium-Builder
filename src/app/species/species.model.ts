export class Species {
  public id: number;
  public name: string;
  public type: string;
  public size?: number;
  public description?: string;
  public heroImg?: string;
  public lifeSpan?: number;
  public difficulty?: number;
  public aggression?: number;
  public waterType?: string;
  public minGroupSize?: number;
  public maxGroupSize?: number;
  public tooFewFish?: number;
  public idealGroupSize?: number;
  public happyAlone: boolean;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
