export class MyTank {
  public id: number;
  public size: string;
  public count: number;
  public speciesArray: number[];

  constructor(demo: boolean) {
    if (demo) {
      this.speciesArray = [0, 0, 1, 2, 3, 3, 0];
    }
  }
}
