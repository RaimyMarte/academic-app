import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAttendanceComponent } from './subject-attendance.component';

describe('SubjectAttendanceComponent', () => {
  let component: SubjectAttendanceComponent;
  let fixture: ComponentFixture<SubjectAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
