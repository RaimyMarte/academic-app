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
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../types/user';

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

  professors: User[] = []

  totalSubjects: number = 0;
  searchTerm: string = ''

  submitted: boolean = false;

  statuses!: any[];

  constructor(private subjectService: SubjectService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService, public paginationService: PaginationService, private searchService: SearchService) { }

  async ngOnInit() {
    this.initializeSubjectList()
    this.professors = await this.userService.getProfessors();
  }

  async initializeSubjectList() {
    const currentPage = this.paginationService.getCurrentPage();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = this.searchService.getSearchTerm();

    // Call loadSubjects to load the data with the current page, page size, and search term
    await this.loadSubjects({ currentPage: currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
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

  editSubject(subject: Subject) {
    this.subject = { ...subject };
    console.log(this.subject)
    this.subjectDialog = true;
  }

  deleteSubject(subject: Subject) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + subject?.Name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subjectService.deleteSubject(subject?.Id);
        this.initializeSubjectList()
        this.subject = {};
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
      if (this.subject?.Id) {
        this.subjectService.updateSubject({ body: this.subject, subjectId: this.subject?.Id });
      } else {
        this.subjectService.createSubject(this.subject);
      }

      this.initializeSubjectList()
      this.subjectDialog = false;
      this.subject = {};
    }
  }
}