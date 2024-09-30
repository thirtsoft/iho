import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConsultationComponent } from './liste-consultation.component';

describe('ListeConsultationComponent', () => {
  let component: ListeConsultationComponent;
  let fixture: ComponentFixture<ListeConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
