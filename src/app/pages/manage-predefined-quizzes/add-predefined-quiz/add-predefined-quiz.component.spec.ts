import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPredefinedQuizComponent} from './add-predefined-quiz.component';

describe('AddPredefinedQuizComponent', () => {
  let component: AddPredefinedQuizComponent;
  let fixture: ComponentFixture<AddPredefinedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPredefinedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPredefinedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
