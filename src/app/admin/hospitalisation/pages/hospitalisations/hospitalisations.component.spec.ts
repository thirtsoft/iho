import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalisationsComponent } from './hospitalisations.component';

describe('HospitalisationsComponent', () => {
  let component: HospitalisationsComponent;
  let fixture: ComponentFixture<HospitalisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalisationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
