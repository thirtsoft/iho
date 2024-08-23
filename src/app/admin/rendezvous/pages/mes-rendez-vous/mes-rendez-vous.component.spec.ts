import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesRendezVousComponent } from './mes-rendez-vous.component';

describe('MesRendezVousComponent', () => {
  let component: MesRendezVousComponent;
  let fixture: ComponentFixture<MesRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesRendezVousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
