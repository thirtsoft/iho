import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHospitalisationComponent } from './create-hospitalisation.component';

describe('CreateHospitalisationComponent', () => {
  let component: CreateHospitalisationComponent;
  let fixture: ComponentFixture<CreateHospitalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHospitalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHospitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
