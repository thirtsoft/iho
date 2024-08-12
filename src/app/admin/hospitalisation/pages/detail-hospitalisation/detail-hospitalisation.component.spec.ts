import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHospitalisationComponent } from './detail-hospitalisation.component';

describe('DetailHospitalisationComponent', () => {
  let component: DetailHospitalisationComponent;
  let fixture: ComponentFixture<DetailHospitalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHospitalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
