import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTankComponent } from './my-tank.component';

describe('MyTankComponent', () => {
  let component: MyTankComponent;
  let fixture: ComponentFixture<MyTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
