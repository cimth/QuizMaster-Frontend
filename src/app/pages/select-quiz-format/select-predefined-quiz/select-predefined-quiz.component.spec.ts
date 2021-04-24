import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectPredefinedQuizComponent} from './select-predefined-quiz.component';

describe('SelectPredefinedQuizComponent', () => {
  let component: SelectPredefinedQuizComponent;
  let fixture: ComponentFixture<SelectPredefinedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPredefinedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPredefinedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
