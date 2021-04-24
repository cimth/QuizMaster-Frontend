import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectQuizFormatComponent} from './select-quiz-format.component';

describe('SelectQuizFormatComponent', () => {
  let component: SelectQuizFormatComponent;
  let fixture: ComponentFixture<SelectQuizFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectQuizFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuizFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
