import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRehercheNotionComponent } from './element-reherche-notion.component';

describe('ElementRehercheNotionComponent', () => {
  let component: ElementRehercheNotionComponent;
  let fixture: ComponentFixture<ElementRehercheNotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementRehercheNotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementRehercheNotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
