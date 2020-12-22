export class MyTank {
  public id: number;
  public size: number;
  public count: number;
  public speciesArray: number[];
  public waterType: string;
  public rating: number;

  constructor(demo: boolean) {
    if (demo) {
      this.speciesArray = [0, 0, 0, 0, 3, 3];
    } else {
      this.speciesArray = [];
    }
    this.size = 200;
    this.waterType = '';
  }
}
