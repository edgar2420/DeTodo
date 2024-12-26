import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizedTripsPage } from './finalized-trips.page';

describe('FinalizedTripsPage', () => {
  let component: FinalizedTripsPage;
  let fixture: ComponentFixture<FinalizedTripsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizedTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
