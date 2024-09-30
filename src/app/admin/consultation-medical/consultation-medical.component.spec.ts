import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationMedicalComponent } from './consultation-medical.component';

describe('ConsultationMedicalComponent', () => {
  let component: ConsultationMedicalComponent;
  let fixture: ComponentFixture<ConsultationMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
