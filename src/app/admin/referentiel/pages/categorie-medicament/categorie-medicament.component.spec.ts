import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieMedicamentComponent } from './categorie-medicament.component';

describe('CategorieMedicamentComponent', () => {
  let component: CategorieMedicamentComponent;
  let fixture: ComponentFixture<CategorieMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieMedicamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
