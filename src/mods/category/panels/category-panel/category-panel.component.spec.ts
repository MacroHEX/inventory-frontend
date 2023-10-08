import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPanelComponent } from './category-panel.component';

describe('CategoryComponent', () => {
  let component: CategoryPanelComponent;
  let fixture: ComponentFixture<CategoryPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPanelComponent]
    });
    fixture = TestBed.createComponent(CategoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
