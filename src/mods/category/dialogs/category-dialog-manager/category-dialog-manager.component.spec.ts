import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDialogManagerComponent } from './category-dialog-manager.component';

describe('CategoryDialogManagerComponent', () => {
  let component: CategoryDialogManagerComponent;
  let fixture: ComponentFixture<CategoryDialogManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDialogManagerComponent]
    });
    fixture = TestBed.createComponent(CategoryDialogManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
