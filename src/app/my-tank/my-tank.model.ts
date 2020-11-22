export class MyTank {
  public id: number;
  public size: number;
  public count: number;
  public speciesArray: number[];
  public waterType: string;

  constructor(demo: boolean) {
    if (demo) {
      this.speciesArray = [0, 0, 1, 2, 3, 3, 0];
    } else {
      this.speciesArray = [];
    }
    this.size = 200;
    this.waterType = '';
  }
}
