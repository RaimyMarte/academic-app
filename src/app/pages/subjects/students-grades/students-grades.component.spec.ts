import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsGradesComponent } from './students-grades.component';

describe('StudentsGradesComponent', () => {
  let component: StudentsGradesComponent;
  let fixture: ComponentFixture<StudentsGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsGradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
