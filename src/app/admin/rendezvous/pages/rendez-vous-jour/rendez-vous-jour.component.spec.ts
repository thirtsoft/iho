import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousJourComponent } from './rendez-vous-jour.component';

describe('RendezVousJourComponent', () => {
  let component: RendezVousJourComponent;
  let fixture: ComponentFixture<RendezVousJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezVousJourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
