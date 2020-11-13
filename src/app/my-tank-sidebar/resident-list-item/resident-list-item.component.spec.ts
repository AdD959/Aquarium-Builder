import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentListItemComponent } from './resident-list-item.component';

describe('ResidentListItemComponent', () => {
  let component: ResidentListItemComponent;
  let fixture: ComponentFixture<ResidentListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
