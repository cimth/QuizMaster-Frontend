import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackendNotReachableComponent} from './backend-not-reachable.component';

describe('BackendNotreachableComponent', () => {
  let component: BackendNotReachableComponent;
  let fixture: ComponentFixture<BackendNotReachableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendNotReachableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendNotReachableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
