import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SubjectService } from '../../../services/subjectservice';
import { Subject } from '../../../types/subject';

@Component({
  selector: 'app-subjects-list',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [MessageService, ConfirmationService, SubjectService],
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.css',
})
export class SubjectsListComponent implements OnInit {
  subjectDialog: boolean = false;

  subjects!: Partial<Subject>[];
  subject!: Partial<Subject>;

  selectedSubjects!: Subject[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private subjectService: SubjectService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    this.subjects = await this.subjectService.getSubjects();
  }

  openNew() {
    this.subject = {};
    this.submitted = false;
    this.subjectDialog = true;
  }

  deleteSelectedSubjects() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Subjects?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subjects = this.subjects.filter((subject) => 
          !this.selectedSubjects?.some((selected) => selected.Id && selected.Id === subject.Id)
        );
        
        this.selectedSubjects = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subjects Deleted', life: 3000 });
      }
    });
  }

  editSubject(subject: Subject) {
    this.subject = { ...subject };
    this.subjectDialog = true;
  }

  deleteSubject(Subject: Subject) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + Subject.Name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subjects = this.subjects.filter((val) => val.Id !== Subject.Id);
        this.subject = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subject Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.subjectDialog = false;
    this.submitted = false;
  }

  saveSubject() {
    this.submitted = true;

    if (this.subject.Name?.trim()) {
      if (this.subject.Id) {
        this.subjects[this.findIndexById(this.subject.Id)] = this.subject;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subject Updated', life: 3000 });
      } else {
        this.subject.Id = this.createId();
        this.subjects.push(this.subject);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subject Created', life: 3000 });
      }

      this.subjects = [...this.subjects];
      this.subjectDialog = false;
      this.subject = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i].Id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string): 'success' | 'warning' | 'danger' | 'info' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}