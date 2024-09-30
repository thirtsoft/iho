import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementExamenDermatologiqueComponent } from './element-examen-dermatologique.component';

describe('ElementExamenDermatologiqueComponent', () => {
  let component: ElementExamenDermatologiqueComponent;
  let fixture: ComponentFixture<ElementExamenDermatologiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementExamenDermatologiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementExamenDermatologiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
