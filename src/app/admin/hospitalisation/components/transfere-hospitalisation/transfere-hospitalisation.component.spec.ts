import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereHospitalisationComponent } from './transfere-hospitalisation.component';

describe('TransfereHospitalisationComponent', () => {
  let component: TransfereHospitalisationComponent;
  let fixture: ComponentFixture<TransfereHospitalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfereHospitalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfereHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
