import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectPickListComponent } from './student-subject-pick-list.component';

describe('StudentSubjectPickListComponent', () => {
  let component: StudentSubjectPickListComponent;
  let fixture: ComponentFixture<StudentSubjectPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSubjectPickListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSubjectPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
