import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectRandomQuizComponent} from './select-random-quiz.component';

describe('SelectRandomQuizComponent', () => {
  let component: SelectRandomQuizComponent;
  let fixture: ComponentFixture<SelectRandomQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRandomQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRandomQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
