import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitComponent } from './lit.component';

describe('LitComponent', () => {
  let component: LitComponent;
  let fixture: ComponentFixture<LitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
