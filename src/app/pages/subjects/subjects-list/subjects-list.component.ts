import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Subject } from '../../../../types/subject';
import { SubjectService } from '../../../../services/subject/subject.service';
import { PaginationService } from '../../../../services/ui/pagination.service';
import { PaginationQuery } from '../../../../types/paginationQuery';
import { getPageChangeDetails } from '../../../../utils/getPageChangeDetails';
import { PageChangeEvent } from '../../../../types/pageChangeEvent';
import { SearchService } from '../../../../services/ui/seach.service';

@Component({
  selector: 'app-subjects-list',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.css',
})
export class SubjectsListComponent implements OnInit {
  subjectDialog: boolean = false;

  subjects!: Partial<Subject>[];
  subject!: Partial<Subject>;
  selectedSubjects!: Subject[] | null;

  totalSubjects: number = 0;
  searchTerm: string = ''

  submitted: boolean = false;

  statuses!: any[];

  constructor(private subjectService: SubjectService, private messageService: MessageService, private confirmationService: ConfirmationService, public paginationService: PaginationService, private searchService: SearchService) { }

  async ngOnInit() {
    const currentPage = this.paginationService.getCurrentPage()
    const rowsPerPage = this.paginationService.getItemsPerPage()
    this.searchTerm = this.searchService.getSearchTerm()

    this.loadSubjects({ currentPage: currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  async loadSubjects({ currentPage, currentPageSize, search }: PaginationQuery) {
    const { subjects, total: totalSubjects } = await this.subjectService.getSubjects({ currentPage, currentPageSize, search });

    this.subjects = subjects
    this.totalSubjects = totalSubjects;
  }

  paginate(event: PageChangeEvent) {
    const { currentPage, rowsPerPage } = getPageChangeDetails(event);

    this.paginationService.onPageEvent(currentPage, rowsPerPage);
    this.loadSubjects({ currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  onSearch() {
    this.searchService.onSearchEvent(this.searchTerm);
    const rowsPerPage = this.paginationService.getItemsPerPage();

    this.loadSubjects({ currentPage: 1, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  onResetSearch() {
    this.searchService.onResetSearch();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = ''

    this.loadSubjects({ currentPage: 1, currentPageSize: rowsPerPage, search: '' });
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