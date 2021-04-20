import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagePredefinedQuizzesComponent} from './manage-predefined-quizzes.component';

describe('ManagePredefinedQuizzesComponent', () => {
  let component: ManagePredefinedQuizzesComponent;
  let fixture: ComponentFixture<ManagePredefinedQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePredefinedQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePredefinedQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
