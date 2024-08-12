import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeSanguinComponent } from './groupe-sanguin.component';

describe('GroupeSanguinComponent', () => {
  let component: GroupeSanguinComponent;
  let fixture: ComponentFixture<GroupeSanguinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeSanguinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeSanguinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
