export class MyTank {
  public id: number;
  public size: number;
  public count: number;
  public speciesArray: number[];

  constructor(demo: boolean) {
    if (demo) {
      this.speciesArray = [0, 0, 1, 2, 3, 3, 0];
      this.size = 200;
    } else {
      this.speciesArray = [];
    }
  }
}
