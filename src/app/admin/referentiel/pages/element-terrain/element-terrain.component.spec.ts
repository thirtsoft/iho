import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTerrainComponent } from './element-terrain.component';

describe('ElementTerrainComponent', () => {
  let component: ElementTerrainComponent;
  let fixture: ComponentFixture<ElementTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
