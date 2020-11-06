export class Species {
  public id: number;
  public name: string;
  public type: string;
  public size?: string;
  public description?: string;
  public heroImg?: string;
  public lifeSpan?: number;
  public difficulty?: string;
  public aggression?: number;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
