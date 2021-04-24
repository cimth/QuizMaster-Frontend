import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPredefinedQuizComponent} from './edit-predefined-quiz.component';

describe('EditPredefinedQuizComponent', () => {
  let component: EditPredefinedQuizComponent;
  let fixture: ComponentFixture<EditPredefinedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPredefinedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPredefinedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
