import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPageNewComponent } from './todos-page-new.component';

describe('TodosPageComponent', () => {
  let component: TodosPageNewComponent;
  let fixture: ComponentFixture<TodosPageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosPageNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
