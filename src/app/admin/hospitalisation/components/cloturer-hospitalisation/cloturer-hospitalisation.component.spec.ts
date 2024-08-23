import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloturerHospitalisationComponent } from './cloturer-hospitalisation.component';

describe('CloturerHospitalisationComponent', () => {
  let component: CloturerHospitalisationComponent;
  let fixture: ComponentFixture<CloturerHospitalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloturerHospitalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloturerHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
