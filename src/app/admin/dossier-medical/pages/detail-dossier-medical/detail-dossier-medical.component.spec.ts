import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDossierMedicalComponent } from './detail-dossier-medical.component';

describe('DetailDossierMedicalComponent', () => {
  let component: DetailDossierMedicalComponent;
  let fixture: ComponentFixture<DetailDossierMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDossierMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDossierMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
