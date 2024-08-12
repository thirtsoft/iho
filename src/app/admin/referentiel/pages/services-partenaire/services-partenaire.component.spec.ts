import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPartenaireComponent } from './services-partenaire.component';

describe('ServicesPartenaireComponent', () => {
  let component: ServicesPartenaireComponent;
  let fixture: ComponentFixture<ServicesPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesPartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
