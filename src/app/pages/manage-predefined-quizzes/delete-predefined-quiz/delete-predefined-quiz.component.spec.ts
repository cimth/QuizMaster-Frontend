import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeletePredefinedQuizComponent} from './delete-predefined-quiz.component';

describe('DeletePredefinedQuizComponent', () => {
  let component: DeletePredefinedQuizComponent;
  let fixture: ComponentFixture<DeletePredefinedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePredefinedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePredefinedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
