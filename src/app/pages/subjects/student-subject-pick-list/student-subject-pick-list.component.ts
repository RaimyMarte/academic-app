import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { StudentSubjectCrossService } from '../../../../services/subject/student-subject-cross.service';
import { StudentSubjectCross } from '../../../../types/studentSubjectCross';
import { SubjectService } from '../../../../services/subject/subject.service';
import { Subject } from '../../../../types/subject';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-student-subject-pick-list',
  standalone: true,
  imports: [PickListModule, AvatarModule, ButtonModule, ConfirmDialogModule, CommonModule, TagModule, TooltipModule,],
  providers: [ConfirmationService],
  templateUrl: './student-subject-pick-list.component.html',
  styleUrl: './student-subject-pick-list.component.css'
})
export class StudentSubjectPickListComponent implements OnInit {
  enrollStudentsDialog: boolean = false;
  subjectId: string | null = ''
  subject!: Subject | null
  enrolledStudents!: StudentSubjectCross[];
  notEnrolledStudents!: StudentSubjectCross[];

  constructor(private studentSubjectCrossService: StudentSubjectCrossService, private confirmationService: ConfirmationService, private subjectService: SubjectService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');

    this.subject = await this.subjectService.getSubject(this.subjectId || '');
    this.enrolledStudents = await this.studentSubjectCrossService.getEnrolledStudents(this.subjectId || '');
    this.notEnrolledStudents = await this.studentSubjectCrossService.getStudentsNotEnrolled(this.subjectId || '');
  }

  saveChanges() {
    this.confirmationService.confirm({
      message: 'Do you want to save the changes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"p-button-primary",
      rejectButtonStyleClass:"p-button-secondary p-button-text",
      accept: () => {
        const enrolledStudensIds = this.enrolledStudents.map((entry) => entry?.Id)
        const notEnrolledStudensIds = this.notEnrolledStudents.map((entry) => entry?.Id)

        this.studentSubjectCrossService.saveSubjectEnrollment({
          SubjectId: this.subjectId,
          EnrollStudents: enrolledStudensIds,
          NotEnrollStudents: notEnrolledStudensIds
        });
      }
    });
  }
}