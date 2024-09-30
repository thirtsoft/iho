import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPlainteComponent } from './element-plainte.component';

describe('ElementPlainteComponent', () => {
  let component: ElementPlainteComponent;
  let fixture: ComponentFixture<ElementPlainteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementPlainteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementPlainteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
