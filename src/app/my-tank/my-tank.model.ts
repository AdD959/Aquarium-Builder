export class MyTank {
  public id: number;
  public size: string;
  public count: number;
  public speciesArray: {speciesId: number, count: number}[];

  constructor(demo: boolean) {
    if (demo) {
      this.speciesArray = [
        { speciesId: 0, count: 6 },
        { speciesId: 1, count: 1 },
        { speciesId: 2, count: 1 },
        { speciesId: 3, count: 1 }
      ];
    }
  }

}
