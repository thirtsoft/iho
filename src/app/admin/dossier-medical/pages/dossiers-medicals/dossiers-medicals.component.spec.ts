import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossiersMedicalsComponent } from './dossiers-medicals.component';

describe('DossiersMedicalsComponent', () => {
  let component: DossiersMedicalsComponent;
  let fixture: ComponentFixture<DossiersMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossiersMedicalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossiersMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
