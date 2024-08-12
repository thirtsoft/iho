import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheAgeComponent } from './tranche-age.component';

describe('TrancheAgeComponent', () => {
  let component: TrancheAgeComponent;
  let fixture: ComponentFixture<TrancheAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrancheAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrancheAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
