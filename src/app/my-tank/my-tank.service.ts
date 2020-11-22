import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyTank } from './my-tank.model';

@Injectable()
export class MyTankService {
  private myTank: MyTank = new MyTank(false);
  watchTank = new Subject<{}>();
  tankSizeChange = new Subject<number>();
  tankAnyChange = new Subject();

  getMyTank() {
    return this.myTank;
  }

  getMySpeciesArray() {
    return this.myTank.speciesArray;
  }

  addToTank(id: number) {
    this.myTank.speciesArray.push(id);
    this.tankUpdated();
  }

  tankUpdated() {
    this.watchTank.next(this.myTank.speciesArray.slice());
    this.tankAnyChange.next();
  }

  removeResident(id: number) {
    const removalIndex = this.myTank.speciesArray.indexOf(id);
    this.myTank.speciesArray.splice(removalIndex, 1);
    this.tankUpdated();
  }

  setTankSize(newSize: number) {
    this.myTank.size = newSize;
    this.tankSizeChange.next(newSize);
    this.tankAnyChange.next();
  }

  getTankSize() {
    return this.myTank.size;
  }

  setWaterType(type: string) {
    this.myTank.waterType = type;
  }

  getWaterType() {
    return this.myTank.waterType;
  }
}
