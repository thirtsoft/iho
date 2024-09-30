import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementHypotheseComponent } from './element-hypothese.component';

describe('ElementHypotheseComponent', () => {
  let component: ElementHypotheseComponent;
  let fixture: ComponentFixture<ElementHypotheseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementHypotheseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementHypotheseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
